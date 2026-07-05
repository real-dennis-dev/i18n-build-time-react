import React, { useState, useEffect, useMemo } from "react";
import translations from "../translations";
import { useLocale } from "../hooks/useLocale";

// Create context
export const TranslationContext = React.createContext();

// Translation Provider component
export const TranslationProvider = ({ children, initialLocale = null }) => {
  const { locale, setLocale, supportedLocales } = useLocale(initialLocale);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to load translations when locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        // In production, we would load static translations
        // For development, we use the imported translations
        if (process.env.NODE_ENV === "production") {
          // Load static translations from build
          const response = await fetch(`/translations/${locale}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load translations for ${locale}`);
          }
          const data = await response.json();
          // Merge with default translations
          // Implementation depends on your setup
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error loading translations:", err);
      }
    };

    loadTranslations();
  }, [locale]);

  // Context value
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      translations,
      loading,
      error,
      supportedLocales,
    }),
    [locale, setLocale, translations, loading, error, supportedLocales]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
