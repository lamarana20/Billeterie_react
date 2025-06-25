import React, { createContext, useState, useEffect,useContext } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from "../Components/AuthContext";


// Crée le contexte
export const CartContext = createContext(null);

// Provider pour encapsuler l'app
export const ShopCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
const { user } = useContext(AuthContext);
  // Charger les produits depuis le JSON local
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Import dynamique du fichier JSON
        const productsData = await import("../data/billets.json");
        setProducts(productsData.default);
      } catch (err) {
        console.error('Erreur de chargement des produits:', err);
        toast.error('Erreur lors du chargement des produits');
      }
    };

    // Charger les commandes existantes depuis localStorage
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (e) {
        console.error("Erreur de lecture des commandes", e);
      }
    };

    fetchProducts();
    loadOrders();
  }, []);

  // Sauvegarder les commandes dans localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Ajouter au panier
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success('Quantité augmentée dans le panier');
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} ajouté au panier`);
    }
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Augmenter la quantité
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info('Quantité augmentée');
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
    toast.info('Quantité diminuée');
  };

  // Supprimer du panier
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.error('Produit retiré du panier');
  };

  
const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        ...orderData,
        userId: user?.id, // 👈 associer la commande à l'utilisateur
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
        status: "confirmed"
      };
      
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      resolve(newOrder);
    }, 800);
  });
};
const getUserOrders = (userId) => {
  return orders.filter(order => order.userId === userId);
};

  // Récupérer une commande par ID
  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const value = {
    cart,
    products,
    orders,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    createOrder,
    getOrderById,
    getUserOrders,
    
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour accéder au contexte
export default ShopCartProvider;