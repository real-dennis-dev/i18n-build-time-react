import { useContext, useMemo, useCallback } from "react";
import { TranslationContext } from "../components/TranslationProvider";
import {
  getTranslation,
  getTranslationWithMetadata,
} from "../utils/translationUtils";
import { getPluralKey } from "../utils/pluralRules";

// Main translation hook with context awareness
export const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  const { locale, setLocale, translations } = context;

  // Memoized translation function
  const t = useCallback(
    (key, variables = {}) => {
      return getTranslation(key, locale, variables);
    },
    [locale]
  );

  // Get translation with metadata
  const tWithMetadata = useCallback(
    (key) => {
      return getTranslationWithMetadata(key, locale);
    },
    [locale]
  );

  // Pluralization helper
  const tPlural = useCallback(
    (key, count, variables = {}) => {
      const translationsObj = translations[locale] || translations["en"];
      const pluralKey = getPluralKey(locale, count);
      const pluralTranslations = translationsObj[key];

      if (!pluralTranslations) {
        return key;
      }

      const pluralString =
        pluralTranslations[pluralKey] ||
        pluralTranslations.other ||
        pluralTranslations.one ||
        key;

      // Process variables in the plural string
      let result = pluralString;
      Object.keys(variables).forEach((varKey) => {
        const value = variables[varKey];
        const placeholder = `{${varKey}}`;
        result = result.replace(new RegExp(placeholder, "g"), value);
      });

      return result;
    },
    [locale, translations]
  );

  // Get available locales
  const availableLocales = useMemo(() => {
    return Object.keys(translations);
  }, [translations]);

  return {
    t,
    tPlural,
    tWithMetadata,
    locale,
    setLocale,
    availableLocales,
    isRTL: useMemo(() => ["ar", "he", "fa"].includes(locale), [locale]),
  };
};

export default useTranslation;
