// Babel plugin for build-time translation injection
export default function babelPluginTranslations({ types: t }) {
  return {
    name: "babel-plugin-translations",
    visitor: {
      CallExpression(path, state) {
        // Check if this is a call to our translation function
        if (
          t.isIdentifier(path.node.callee, { name: "t" }) ||
          t.isIdentifier(path.node.callee, { name: "useTranslation" })
        ) {
          // Get the translation key from the arguments
          const args = path.node.arguments;
          if (args.length > 0 && t.isStringLiteral(args[0])) {
            const key = args[0].value;

            // In production, we can replace with static translation
            if (process.env.NODE_ENV === "production") {
              // This would be replaced with actual translation lookup
              // For now, we'll keep it as is
            }
          }
        }
      },
    },
  };
}
