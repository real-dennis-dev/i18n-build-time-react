// English translations with context and metadata
export default {
  // Product translations with context
  product: {
    honey: {
      translation: "Honey",
      context: "Food product, sweet substance made by bees",
      notes: 'Not to be confused with "cariño" which means affection',
    },
    milk: {
      translation: "Milk",
      context: "Dairy product",
      notes: "White liquid produced by mammals",
    },
    bread: {
      translation: "Bread",
      context: "Food product made from flour and water",
    },
  },

  // UI translations
  ui: {
    welcome: {
      translation: "Welcome to our store!",
      context: "Greeting message on homepage",
      notes: "Friendly welcome for new visitors",
    },
    addToCart: {
      translation: "Add to Cart",
      context: "Button text for adding items to shopping cart",
      notes: "Should be action-oriented",
    },
    checkout: {
      translation: "Proceed to Checkout",
      context: "Button text for proceeding to payment",
      notes: "Should be clear and action-oriented",
    },
  },

  // Dynamic content with pluralization
  cart: {
    items: {
      zero: "Your cart is empty",
      one: "You have {count} item in your cart",
      other: "You have {count} items in your cart",
      context: "Cart item count display",
      notes: "Supports pluralization based on count",
    },
  },

  // Error messages
  errors: {
    network: {
      translation: "Network connection error. Please try again.",
      context: "Error shown when network request fails",
      notes: "User-friendly error message",
    },
    server: {
      translation: "Server error. Please try again later.",
      context: "Error shown when server returns error",
      notes: "Generic server error message",
    },
  },
};
