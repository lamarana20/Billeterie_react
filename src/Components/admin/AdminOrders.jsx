import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await AdminService.getAllOrders();
        setOrders(data);
      } catch (error) {
        toast.error('Erreur de chargement des commandes: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await AdminService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success('Statut mis à jour avec succès');
    } catch (error) {
      toast.error('Échec de la mise à jour: ' + error.message);
    }
  };

  // Filtrage et pagination
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Styles réutilisables
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestion des commandes</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredOrders.length} commande(s) trouvée(s)
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrer par statut"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau responsive avec version mobile */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Version desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Aucune commande correspondante
                  </td>
                </tr>
              ) : (
                currentItems.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.customer.fullName}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total.toLocaleString()} GNF
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs rounded-md px-3 py-1 ${statusStyles[order.status]}`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Version mobile */}
        <div className="md:hidden">
          {currentItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Aucune commande correspondante
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {currentItems.map(order => (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Commande #{order.id}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.customer.fullName}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[order.status]}`}>
                      {order.status === 'confirmed' ? 'Confirmée' : 
                       order.status === 'cancelled' ? 'Annulée' : 'En attente'}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm font-medium">{order.total.toLocaleString()} GNF</p>
                    <div className="flex space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs rounded-md px-2 py-1 ${statusStyles[order.status]}`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                      <Link
                        to={`/order-confirmation/${order.id}`}
                        className="text-blue-600 text-xs hover:text-blue-900"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredOrders.length)}
                  </span>{' '}
                  sur <span className="font-medium">{filteredOrders.length}</span> résultats
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Précédent</span>
                    &larr;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Suivant</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;