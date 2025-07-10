import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await AdminService.getStats();
        setStats(data);

        // Simuler des activités récentes
        setRecentActivities([
          { id: 1, action: "Nouvelle commande pour le Match de Football", time: "il y a 2 heures" },
       
        ]);
      } catch (error) {
        toast.error('Erreur de chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-600">
        Chargement des statistiques...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tableau de bord</h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium text-gray-500">Commandes totales</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium text-gray-500">Chiffre d'affaires</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalRevenue.toLocaleString()} GNF</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium text-gray-500">Taux de conversion</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Activité récente</h2>

        {recentActivities.length === 0 ? (
          <p className="text-gray-600">Aucune activité récente disponible.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-2 flex justify-between text-sm text-gray-700">
                <span>{activity.action}</span>
                <span className="text-gray-400 text-xs">{activity.time}</span>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
