// Translation registry
import en from "./en";
import es from "./es";
import fr from "./fr";

// Context metadata for validation
const translationMetadata = {
  supportedLocales: ["en", "es", "fr"],
  defaultLocale: "en",
  fallbackLocale: "en",
  localeNames: {
    en: "English",
    es: "Español",
    fr: "Français",
  },
};

// Translation registry with all locales
export const translations = {
  en,
  es,
  fr,
};

// Utility to get all translation keys for build-time generation
export const getTranslationKeys = () => {
  const keys = [];
  const defaultTranslations = translations["en"];

  const traverse = (obj, prefix = "") => {
    Object.keys(obj).forEach((key) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value.translation) {
        keys.push(currentPath);
      } else if (typeof value === "object" && value !== null) {
        traverse(value, currentPath);
      }
    });
  };

  traverse(defaultTranslations);
  return keys;
};

// Export metadata
export { translationMetadata };
export default translations;
