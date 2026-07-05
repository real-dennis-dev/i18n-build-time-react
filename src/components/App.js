import React from "react";
import TranslationProvider from "../i18n/components/TranslationProvider";
import { Translate, TranslateWithDebug } from "../i18n/components/Translate";
import LanguageSelector from "../i18n/components/LanguageSelector";
import { useTranslation } from "../i18n/hooks/useTranslation";

// Main app component with translation features
const AppContent = () => {
  const { t, tPlural, locale, setLocale } = useTranslation();

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <Translate text="ui.welcome" />
        </h1>
        <LanguageSelector showFlags={true} />
      </header>

      <main className="app-main">
        <section className="product-section">
          <h2>Products</h2>

          <div className="product">
            <span className="product-name">
              <Translate text="product.honey" />
            </span>
            <span className="product-context">
              {/* Using debug version to show context */}
              <TranslateWithDebug text="product.honey" showMetadata={true} />
            </span>
          </div>

          <div className="product">
            <span className="product-name">
              <Translate text="product.milk" />
            </span>
          </div>

          <div className="product">
            <span className="product-name">
              <Translate text="product.bread" />
            </span>
          </div>
        </section>

        <section className="cart-section">
          <h2>Shopping Cart</h2>

          {/* Example with pluralization */}
          <p>{tPlural("cart.items", 0, { count: 0 })}</p>
          <p>{tPlural("cart.items", 1, { count: 1 })}</p>
          <p>{tPlural("cart.items", 3, { count: 3 })}</p>

          <button className="add-to-cart">
            <Translate text="ui.addToCart" />
          </button>
          <button className="checkout">
            <Translate text="ui.checkout" />
          </button>
        </section>

        <section className="error-section">
          <h3>Error Messages</h3>
          <div className="error network-error">
            <Translate text="errors.network" />
          </div>
          <div className="error server-error">
            <Translate text="errors.server" />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="locale-info">
          Current locale: {locale}
          <button onClick={() => setLocale("en")}>EN</button>
          <button onClick={() => setLocale("es")}>ES</button>
          <button onClick={() => setLocale("fr")}>FR</button>
        </div>
      </footer>
    </div>
  );
};

// Wrapped app with provider
const App = () => {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
};

export default App;
