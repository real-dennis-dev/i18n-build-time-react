import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

// Entry point
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Build-time translation generation (only in development)
if (process.env.NODE_ENV === "development") {
  const {
    generateBuildTimeTranslations,
    validateBuildTranslations,
  } = require("./i18n/utils/buildTimeGenerator");

  // Generate translations for build
  generateBuildTimeTranslations();

  // Validate translations
  const issues = validateBuildTranslations();
  if (issues.length > 0) {
    console.warn("Translation validation issues:", issues);
  }
}
