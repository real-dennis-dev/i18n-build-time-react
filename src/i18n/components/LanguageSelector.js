import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

// Language selector component
export const LanguageSelector = ({
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  showFlags = false,
  ...props
}) => {
  const { locale, setLocale, availableLocales } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Language options with names
  const languageOptions = {
    en: { name: "English", flag: "🇬🇧" },
    es: { name: "Español", flag: "🇪🇸" },
    fr: { name: "Français", flag: "🇫🇷" },
  };

  const currentLanguage = languageOptions[locale] || { name: locale, flag: "" };

  const handleLanguageSelect = (newLocale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`language-selector ${className}`} {...props}>
      <button
        className={`language-selector-button ${buttonClassName}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLanguage.name}`}
      >
        {showFlags && (
          <span className="language-flag">{currentLanguage.flag}</span>
        )}
        <span className="language-name">{currentLanguage.name}</span>
        <span className="language-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={`language-selector-dropdown ${dropdownClassName}`}>
          {availableLocales.map((localeKey) => {
            const option = languageOptions[localeKey] || {
              name: localeKey,
              flag: "",
            };

            const isActive = localeKey === locale;

            return (
              <button
                key={localeKey}
                className={`language-option ${isActive ? "active" : ""}`}
                onClick={() => handleLanguageSelect(localeKey)}
                aria-current={isActive ? "true" : "false"}
                aria-label={`Select ${option.name}`}
              >
                {showFlags && (
                  <span className="language-flag">{option.flag}</span>
                )}
                <span className="language-name">{option.name}</span>
                {isActive && <span className="language-check">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Simplified language selector (as a select dropdown)
export const LanguageSelect = ({ className = "", ...props }) => {
  const { locale, setLocale, availableLocales } = useTranslation();

  const languageOptions = {
    en: "English",
    es: "Español",
    fr: "Français",
  };

  const handleChange = (e) => {
    setLocale(e.target.value);
  };

  return (
    <select
      className={`language-select ${className}`}
      value={locale}
      onChange={handleChange}
      {...props}
    >
      {availableLocales.map((localeKey) => (
        <option key={localeKey} value={localeKey}>
          {languageOptions[localeKey] || localeKey}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
