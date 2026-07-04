```markdown
# Advanced Context-Aware i18n for React

A powerful, developer-friendly internationalization system for **React** with **build-time optimization**, context-aware translations, pluralization, and rich metadata support.

---

## ✨ Key Features

- **Context-Aware Translations** — Every string includes context and notes to prevent mistranslations (e.g., "honey" vs affection)
- **Build-Time Generation** — Translations are flattened and optimized during build
- **Pluralization Support** — Zero/one/other forms with locale-specific rules
- **Variable Interpolation** — `{count}`, `{name}`, etc.
- **Rich Metadata** — Context, notes, and debugging capabilities
- **Type-Safe Experience** — Translation key validation and consistency checks
- **React Hooks & Components** — `useTranslation`, `Translate`, `LanguageSelector`
- **Persistence** — User language preference saved in localStorage
- **Fallback System** — Graceful degradation to default locale
- **Debug Mode** — View translation metadata in development

---

## 📁 Folder Structure
```

src/
├── i18n/
│ ├── index.js
│ ├── translations/ # All translation files
│ │ ├── en.js
│ │ ├── es.js
│ │ ├── fr.js
│ │ └── index.js
│ ├── components/
│ │ ├── TranslationProvider.js
│ │ ├── Translate.js
│ │ └── LanguageSelector.js
│ ├── hooks/
│ │ ├── useTranslation.js
│ │ └── useLocale.js
│ ├── utils/
│ │ ├── translationUtils.js
│ │ ├── buildTimeGenerator.js
│ │ └── pluralRules.js
│ └── plugins/
│ └── babel-plugin-translations.js
├── components/
│ └── App.js
└── index.js

````

---

## 🚀 Installation & Setup

1. Copy the `src/i18n` folder and related files into your project.
2. Install required dependencies (if missing):

```bash
npm install react react-dom
````

3. Add build-time generation to your scripts in `package.json`:

```json
{
  "scripts": {
    "build": "npm run generate:i18n && react-scripts build",
    "generate:i18n": "node -r esm src/i18n/utils/buildTimeGenerator.js",
    "prestart": "npm run generate:i18n"
  }
}
```

4. Wrap your app with `TranslationProvider`:

```jsx
import { TranslationProvider } from "./i18n/components/TranslationProvider";

const App = () => (
  <TranslationProvider>
    <YourApp />
  </TranslationProvider>
);
```

---

## 💡 Basic Usage

### Using the Hook

```jsx
import { useTranslation } from "./i18n/hooks/useTranslation";

const MyComponent = () => {
  const { t, tPlural, locale, setLocale } = useTranslation();

  return (
    <>
      <h1>{t("ui.welcome")}</h1>
      <p>{t("product.honey")}</p>

      {/* Pluralization */}
      <p>{tPlural("cart.items", 5, { count: 5 })}</p>

      <button onClick={() => setLocale("es")}>Español</button>
    </>
  );
};
```

### Using the `<Translate>` Component

```jsx
<Translate text="ui.addToCart" />

<Translate
  text="cart.items"
  plural={true}
  count={3}
  variables={{ count: 3 }}
/>
```

---

## 📝 Translation Structure

Each translation entry includes rich metadata:

```js
product: {
  honey: {
    translation: 'Honey',
    context: 'Food product, sweet substance made by bees',
    notes: 'Not to be confused with "cariño"'
  }
}
```

This helps translators understand intent and avoid costly mistakes.

---

## 🔧 Core Utilities

- **`getTranslation(key, locale, variables)`** — Main translation function
- **`tPlural(key, count, variables)`** — Plural-aware translations
- **`validateTranslations()`** — Cross-locale consistency checks
- **`flattenTranslations()`** — Build-time optimization

---

## 🌍 Adding a New Language

1. Create `src/i18n/translations/de.js` following the same structure.
2. Import and add it in `translations/index.js`.
3. Update `translationMetadata.supportedLocales`.
4. Run the build command.

---

## 🛠 Build-Time Features

- Generates optimized flat JSON files in `dist/translations/`
- Validates missing keys across languages
- Creates metadata file
- Supports Babel plugin for static replacement (optional)

---

## 🎨 Components Included

- **`TranslationProvider`** — Context provider with locale management
- **`Translate`** — Declarative translation component
- **`TranslateWithDebug`** — Shows context/notes in development
- **`LanguageSelector`** — Dropdown with flags (customizable)
- **`LanguageSelect`** — Simple `<select>` version

---

## 🔍 Debug Mode

Enable metadata display during development:

```jsx
<TranslateWithDebug text="product.honey" showMetadata={true} />
```

This shows the translation + context + notes directly in the UI.

---

## Key Benefits

- **Prevents Mistranslations** through rich context
- **Excellent Developer Experience** with hooks and components
- **Production Optimized** via build-time processing
- **Maintainable** — Clear separation of concerns
- **Extensible** — Easy to add plural rules, RTL, etc.

---

## Future Enhancements

- Over-the-air translation updates
- ICU MessageFormat support
- Automatic key extraction
- Integration with translation management systems (TMS)
- Advanced pluralization (CLDR)

---

## 📄 License

MIT License

---

**Built for teams that care about translation quality.**

Happy internationalizing! 🌍

```

```
