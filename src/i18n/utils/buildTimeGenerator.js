// Build-time translation generator
import fs from "fs";
import path from "path";
import translations, { translationMetadata } from "../translations";

// Generate static translation files for each locale
export const generateBuildTimeTranslations = () => {
  const outputDir = path.join(process.cwd(), "dist", "translations");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate a translation file for each locale
  Object.keys(translations).forEach((locale) => {
    const localeTranslations = translations[locale];
    const filePath = path.join(outputDir, `${locale}.json`);

    // Flatten the translation object for easy lookup
    const flattened = flattenTranslations(localeTranslations);

    fs.writeFileSync(filePath, JSON.stringify(flattened, null, 2));
    console.log(`Generated translations for locale: ${locale}`);
  });

  // Generate metadata file
  const metadataPath = path.join(outputDir, "metadata.json");
  fs.writeFileSync(metadataPath, JSON.stringify(translationMetadata, null, 2));
  console.log("Generated translation metadata");
};

// Flatten nested translations for performance
export const flattenTranslations = (obj, prefix = "") => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value.translation) {
      flattened[currentPath] = value.translation;
    } else if (typeof value === "object" && value !== null) {
      const nested = flattenTranslations(value, currentPath);
      Object.assign(flattened, nested);
    }
  });

  return flattened;
};

// Load static translations (for production)
export const loadStaticTranslations = (locale) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "dist",
      "translations",
      `${locale}.json`
    );
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    return null;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return null;
  }
};

// Generate translation key mappings for fast lookup
export const generateKeyMap = () => {
  const keyMap = {};
  const defaultTranslations = translations["en"];

  const traverse = (obj, prefix = "") => {
    Object.keys(obj).forEach((key) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value.translation) {
        keyMap[currentPath] = {
          path: currentPath,
          context: value.context || "",
          notes: value.notes || "",
        };
      } else if (typeof value === "object" && value !== null) {
        traverse(value, currentPath);
      }
    });
  };

  traverse(defaultTranslations);
  return keyMap;
};

// Build-time translation validation
export const validateBuildTranslations = () => {
  const issues = [];
  const defaultKeys = getTranslationKeys(translations["en"]);

  Object.keys(translations).forEach((locale) => {
    const localeKeys = getTranslationKeys(translations[locale]);
    const missingKeys = defaultKeys.filter((key) => !localeKeys.includes(key));

    if (missingKeys.length > 0) {
      issues.push({
        locale,
        missingKeys,
        severity: "error",
        message: `Missing translations for keys: ${missingKeys.join(", ")}`,
      });
    }
  });

  return issues;
};

// Helper to get translation keys recursively
export const getTranslationKeys = (obj, prefix = "") => {
  const keys = [];

  Object.keys(obj).forEach((key) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value.translation) {
      keys.push(currentPath);
    } else if (typeof value === "object" && value !== null) {
      keys.push(...getTranslationKeys(value, currentPath));
    }
  });

  return keys;
};

export default {
  generateBuildTimeTranslations,
  flattenTranslations,
  loadStaticTranslations,
  generateKeyMap,
  validateBuildTranslations,
};
