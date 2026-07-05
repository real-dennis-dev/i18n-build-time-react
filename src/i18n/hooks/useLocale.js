import { useState, useEffect, useCallback } from "react";
import { translationMetadata } from "../translations";

// Locale management hook with persistence
export const useLocale = (initialLocale = null) => {
  const [locale, setLocaleState] = useState(() => {
    // Try to get from localStorage first
    const savedLocale = localStorage.getItem("preferred-locale");
    if (
      savedLocale &&
      translationMetadata.supportedLocales.includes(savedLocale)
    ) {
      return savedLocale;
    }

    // Try browser language
    const browserLang = navigator.language.split("-")[0];
    if (translationMetadata.supportedLocales.includes(browserLang)) {
      return browserLang;
    }

    // Fallback to default
    return translationMetadata.defaultLocale;
  });

  // Set locale with persistence
  const setLocale = useCallback((newLocale) => {
    if (translationMetadata.supportedLocales.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem("preferred-locale", newLocale);

      // Dispatch custom event for other components
      window.dispatchEvent(
        new CustomEvent("localeChanged", { detail: { locale: newLocale } })
      );
    } else {
      console.warn(
        `Unsupported locale: ${newLocale}. Supported locales: ${translationMetadata.supportedLocales.join(
          ", "
        )}`
      );
    }
  }, []);

  // Effect to handle browser language changes
  useEffect(() => {
    const handleLocaleChange = (event) => {
      if (event.detail && event.detail.locale) {
        setLocale(event.detail.locale);
      }
    };

    window.addEventListener("localeChanged", handleLocaleChange);

    return () => {
      window.removeEventListener("localeChanged", handleLocaleChange);
    };
  }, [setLocale]);

  return {
    locale,
    setLocale,
    isSupported: translationMetadata.supportedLocales.includes(locale),
    supportedLocales: translationMetadata.supportedLocales,
    localeNames: translationMetadata.localeNames,
  };
};

export default useLocale;
