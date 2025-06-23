import React, { createContext,  useState,useEffect } from "react";

// 👉 Crée le contexte
export const CartContext = createContext(null);

// 👉 Provider pour encapsuler l'app
export const ShopCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Ajouter au panier
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  // Augmenter la quantité
const increaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

// Diminuer la quantité (mais pas en dessous de 1)
const decreaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    )
  );
};


  // Supprimer du panier
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  //products
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://store-management-backend-main-ehdxlo.laravel.cloud/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Erreur de chargement des produits:', err);
      } 
    };

    fetchProducts();
  }, [
    
  ]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    products,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// 👉 Hook pour accéder au contexte
export default ShopCartProvider;
