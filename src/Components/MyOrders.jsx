import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { OrderService } from '../services/orderService';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await OrderService.getUserOrders(user.id);
        setOrders(data);
      } catch (err) {
        setError("Erreur lors du chargement des commandes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p>Veuillez vous connecter pour voir vos commandes.</p>;

  if (loading) return <p>Chargement des commandes...</p>;

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mes commandes</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-lg mb-4">Aucune commande trouvée pour le moment.</p>
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
                    Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR')} • {order.items?.length || 0} article(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{order.total?.toLocaleString() || 0} GNF</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      order.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status === "confirmed"
                      ? "Confirmée"
                      : order.status === "cancelled"
                      ? "Annulée"
                      : "En traitement"}
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

export default MyOrders;
