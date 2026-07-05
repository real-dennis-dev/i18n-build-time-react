// Pluralization rules for different locales
export const pluralRules = {
  en: {
    getPluralKey: (count) => {
      if (count === 0) return "zero";
      if (count === 1) return "one";
      return "other";
    },
  },
  es: {
    getPluralKey: (count) => {
      if (count === 0) return "zero";
      if (count === 1) return "one";
      return "other";
    },
  },
  fr: {
    getPluralKey: (count) => {
      if (count === 0) return "zero";
      if (count === 1) return "one";
      return "other";
    },
  },
};

// Get pluralization for a specific locale
export const getPluralKey = (locale, count) => {
  const rules = pluralRules[locale] || pluralRules["en"];
  return rules.getPluralKey(count);
};

// Get translated plural string
export const getPluralTranslation = (translations, count) => {
  const key = getPluralKey("en", count);
  return translations[key] || translations.other || translations.one || "";
};

export default {
  pluralRules,
  getPluralKey,
  getPluralTranslation,
};
