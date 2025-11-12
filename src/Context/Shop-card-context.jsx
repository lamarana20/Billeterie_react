import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from "../Components/AuthContext";
import { useSearch } from "../Context/SearchContext";

// Create Cart Context
export const CartContext = createContext(null);

/**
 * Shop Cart Provider Component
 * Manages shopping cart state, orders, and cart operations
 */
export const ShopCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const { allEvents, eventsLoaded } = useSearch();

  // Products come from SearchContext
  const products = allEvents;

  // Load orders from localStorage on component mount
  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('ticketHubOrders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (e) {
        console.error("Error reading orders from localStorage", e);
        toast.error('Error loading order history');
      }
    };

    loadOrders();
  }, []);

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ticketHubOrders', JSON.stringify(orders));
  }, [orders]);

  /**
   * Add product to shopping cart
   * @param {Object} product - Product to add to cart
   */
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success(`Increased quantity of ${product.name} in cart`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart successfully`);
    }
  };

  /**
   * Remove all items from cart
   */
  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared successfully');
  };

  /**
   * Increase quantity of item in cart
   * @param {number} id - Product ID
   */
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info('Item quantity increased');
  };

  /**
   * Decrease quantity of item in cart (minimum 1)
   * @param {number} id - Product ID
   */
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
    toast.info('Item quantity decreased');
  };

  /**
   * Remove specific item from cart
   * @param {number} id - Product ID to remove
   */
  const removeFromCart = (id) => {
    const itemToRemove = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    toast.error(`${itemToRemove?.name || 'Item'} removed from cart`);
  };

  /**
   * Create new order from cart items
   * @param {Object} orderData - Order information
   * @returns {Promise<Object>} Newly created order
   */
  const createOrder = async (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          ...orderData,
          userId: user?.id,
          id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
          createdAt: new Date().toISOString(),
          status: "confirmed",
          orderNumber: `TH${Date.now()}`
        };
        
        const updatedOrders = [newOrder, ...orders];
        setOrders(updatedOrders);
        resolve(newOrder);
      }, 800);
    });
  };

  /**
   * Get orders for specific user
   * @param {string} userId - User ID
   * @returns {Array} User's orders
   */
  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  /**
   * Get order by ID
   * @param {number} id - Order ID
   * @returns {Object|null} Order object or null if not found
   */
  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  /**
   * Calculate total cart value
   * @returns {number} Total cart value
   */
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * Calculate total number of items in cart
   * @returns {number} Total items count
   */
  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Context value containing all state and methods
  const value = {
    cart,
    products: eventsLoaded ? products : [],
    orders,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    createOrder,
    getOrderById,
    getUserOrders,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default ShopCartProvider;