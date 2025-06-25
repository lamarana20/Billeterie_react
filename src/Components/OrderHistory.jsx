import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderService } from "../services/orderService";
import { Spinner } from "@material-tailwind/react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await OrderService.getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
       <Spinner className="h-12 w-12 mx-auto mt-20" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Vos commandes</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-lg mb-4">Vous n'avez pas encore passé de commande</p>
          <Link 
            to="/" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Link 
              key={order.id} 
              to={`/order-confirmation/${order.id}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">Commande #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')} • {order.items.length} article(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{order.total.toLocaleString()} GNF</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    order.status === "confirmed" ? "bg-green-100 text-green-800" :
                    order.status === "cancelled" ? "bg-red-100 text-red-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {order.status === "confirmed" ? "Confirmée" :
                     order.status === "cancelled" ? "Annulée" : 
                     "En traitement"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;