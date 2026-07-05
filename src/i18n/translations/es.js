// Spanish translations with the same structure
export default {
  product: {
    honey: {
      translation: "Miel",
      context: "Producto alimenticio, sustancia dulce hecha por abejas",
      notes: 'No confundir con "cariño" que significa afecto',
    },
    milk: {
      translation: "Leche",
      context: "Producto lácteo",
      notes: "Líquido blanco producido por mamíferos",
    },
    bread: {
      translation: "Pan",
      context: "Producto alimenticio hecho de harina y agua",
    },
  },

  ui: {
    welcome: {
      translation: "¡Bienvenido a nuestra tienda!",
      context: "Mensaje de saludo en la página principal",
      notes: "Saludo amistoso para nuevos visitantes",
    },
    addToCart: {
      translation: "Añadir al Carrito",
      context: "Texto del botón para añadir artículos al carrito",
      notes: "Debe ser orientado a la acción",
    },
    checkout: {
      translation: "Proceder al Pago",
      context: "Texto del botón para proceder al pago",
      notes: "Debe ser claro y orientado a la acción",
    },
  },

  cart: {
    items: {
      zero: "Tu carrito está vacío",
      one: "Tienes {count} artículo en tu carrito",
      other: "Tienes {count} artículos en tu carrito",
      context: "Visualización del conteo de artículos en el carrito",
      notes: "Soporta pluralización basada en el conteo",
    },
  },

  errors: {
    network: {
      translation: "Error de conexión de red. Por favor, inténtalo de nuevo.",
      context: "Error que se muestra cuando falla una solicitud de red",
      notes: "Mensaje de error fácil de usar",
    },
    server: {
      translation: "Error del servidor. Por favor, inténtalo más tarde.",
      context: "Error que se muestra cuando el servidor devuelve un error",
      notes: "Mensaje de error genérico del servidor",
    },
  },
};
