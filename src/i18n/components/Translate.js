import React from "react";
import { useTranslation } from "../hooks/useTranslation";

// Translation component with support for variables
export const Translate = ({
  text,
  variables = {},
  plural = null,
  count = null,
  as = "span",
  className = "",
  ...props
}) => {
  const { t, tPlural } = useTranslation();

  // Determine translation
  let translation;
  if (plural !== null && count !== null) {
    translation = tPlural(text, count, { count, ...variables });
  } else {
    translation = t(text, variables);
  }

  // Handle HTML content
  if (props.dangerouslySetInnerHTML) {
    return React.createElement(as, {
      className,
      dangerouslySetInnerHTML: { __html: translation },
      ...props,
    });
  }

  // Regular rendering
  return React.createElement(as, { className, ...props }, translation);
};

// Translation component with metadata (for debugging)
export const TranslateWithDebug = ({
  text,
  variables = {},
  showMetadata = false,
}) => {
  const { t, tWithMetadata } = useTranslation();

  if (showMetadata) {
    const metadata = tWithMetadata(text);
    return (
      <div className="translation-debug">
        <span className="translation-text">
          {processTranslation(metadata.translation, variables)}
        </span>
        <span className="translation-context">{metadata.context}</span>
        <span className="translation-notes">{metadata.notes}</span>
      </div>
    );
  }

  return <Translate text={text} variables={variables} />;
};

// Helper for processing translation with variables
const processTranslation = (template, variables) => {
  let result = template;
  Object.keys(variables).forEach((key) => {
    const value = variables[key];
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, "g"), value);
  });
  return result;
};

export default Translate;
