// French translations
export default {
  product: {
    honey: {
      translation: "Miel",
      context:
        "Produit alimentaire, substance sucrée fabriquée par les abeilles",
      notes: 'Ne pas confondre avec "chéri" qui signifie affection',
    },
    milk: {
      translation: "Lait",
      context: "Produit laitier",
      notes: "Liquide blanc produit par les mammifères",
    },
    bread: {
      translation: "Pain",
      context: "Produit alimentaire fait de farine et d'eau",
    },
  },

  ui: {
    welcome: {
      translation: "Bienvenue dans notre magasin !",
      context: "Message d'accueil sur la page d'accueil",
      notes: "Accueil amical pour les nouveaux visiteurs",
    },
    addToCart: {
      translation: "Ajouter au Panier",
      context: "Texte du bouton pour ajouter des articles au panier",
      notes: "Doit être orienté vers l'action",
    },
    checkout: {
      translation: "Passer à la Caisse",
      context: "Texte du bouton pour passer au paiement",
      notes: "Doit être clair et orienté vers l'action",
    },
  },

  cart: {
    items: {
      zero: "Votre panier est vide",
      one: "Vous avez {count} article dans votre panier",
      other: "Vous avez {count} articles dans votre panier",
      context: "Affichage du nombre d'articles dans le panier",
      notes: "Prend en charge la pluralisation basée sur le nombre",
    },
  },

  errors: {
    network: {
      translation: "Erreur de connexion réseau. Veuillez réessayer.",
      context: "Erreur affichée lorsque la requête réseau échoue",
      notes: "Message d'erreur convivial",
    },
    server: {
      translation: "Erreur du serveur. Veuillez réessayer plus tard.",
      context: "Erreur affichée lorsque le serveur renvoie une erreur",
      notes: "Message d'erreur générique du serveur",
    },
  },
};
