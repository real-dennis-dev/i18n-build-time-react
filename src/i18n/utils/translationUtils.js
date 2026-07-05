// Translation utilities for context-aware translation
import translations from "../translations";

// Deep get with path support
export const getNestedTranslation = (obj, path) => {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current && current[key]) {
      current = current[key];
    } else {
      return null;
    }
  }

  return current;
};

// Get translation with context awareness
export const getTranslation = (key, locale, variables = {}) => {
  const localeTranslations = translations[locale] || translations["en"];
  const translationObj = getNestedTranslation(localeTranslations, key);

  if (!translationObj) {
    // Fallback to default locale
    const defaultTranslations = translations["en"];
    const defaultTranslationObj = getNestedTranslation(
      defaultTranslations,
      key
    );

    if (!defaultTranslationObj) {
      return key; // Return key if translation not found
    }

    return processTranslation(defaultTranslationObj.translation, variables);
  }

  return processTranslation(translationObj.translation, variables);
};

// Process translation with variables
export const processTranslation = (template, variables) => {
  let result = template;

  Object.keys(variables).forEach((key) => {
    const value = variables[key];
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, "g"), value);
  });

  return result;
};

// Get translation with metadata (for debugging)
export const getTranslationWithMetadata = (key, locale) => {
  const localeTranslations = translations[locale] || translations["en"];
  const translationObj = getNestedTranslation(localeTranslations, key);

  if (!translationObj) {
    return {
      translation: key,
      context: "Translation not found",
      notes: "Using key as fallback",
    };
  }

  return translationObj;
};

// Validate translation consistency across locales
export const validateTranslations = () => {
  const defaultKeys = getTranslationKeys(translations["en"]);
  const issues = [];

  Object.keys(translations).forEach((locale) => {
    if (locale === "en") return;

    const localeKeys = getTranslationKeys(translations[locale]);
    const missingKeys = defaultKeys.filter((key) => !localeKeys.includes(key));

    if (missingKeys.length > 0) {
      issues.push({
        locale,
        missingKeys,
        message: `Missing translations for keys: ${missingKeys.join(", ")}`,
      });
    }
  });

  return issues;
};

// Helper to get all translation keys
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
  getTranslation,
  getNestedTranslation,
  processTranslation,
  getTranslationWithMetadata,
  validateTranslations,
  getTranslationKeys,
};
