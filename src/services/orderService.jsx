// src/services/orderService.js

// Simule un délai réseau
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Charge les commandes depuis localStorage
const loadOrders = () => {
  try {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (e) {
    console.error("Erreur de lecture des commandes", e);
    return [];
  }
};

// Sauvegarde les commandes dans localStorage
const saveOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const OrderService = {
  async createOrder(orderData) {
    await simulateNetworkDelay();
    
    const orders = loadOrders();
    const newOrder = {
      ...orderData,
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1000,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      payment: {
        ...orderData.payment,
        transactionId: `TRX-${Date.now()}`
      }
    };
    
    orders.unshift(newOrder);
    saveOrders(orders);
    
    return newOrder;
  },

  async getOrderById(id) {
    await simulateNetworkDelay();
    const orders = loadOrders();
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error("Commande non trouvée");
    return order;
  },

  async getAllOrders() {
    await simulateNetworkDelay();
    return loadOrders();
  },

  async getUserOrders(userId) {
    await simulateNetworkDelay();
    const orders = loadOrders();
    return orders.filter(order => order.userId === userId);
  },

  async cancelOrder(id) {
    await simulateNetworkDelay();
    const orders = loadOrders();
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: "cancelled" } : order
    );
    saveOrders(updatedOrders);
    return true;
  },
  
};