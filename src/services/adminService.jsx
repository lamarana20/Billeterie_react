import { OrderService } from './orderService';

export const AdminService = {
  async getAllOrders() {
    return OrderService.getAllOrders();
  },

  async getStats() {
    const orders = await this.getAllOrders();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
    
    return {
      totalOrders,
      totalRevenue,
      confirmedOrders,
      conversionRate: totalOrders > 0 
        ? Math.round((confirmedOrders / totalOrders) * 100) 
        : 0,
      recentOrders: orders.slice(0, 5)
    };
  },

  async updateOrderStatus(id, status) {
    const orders = await this.getAllOrders();
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status } : order
    );
    
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return { id, status };
  }
};