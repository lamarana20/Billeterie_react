import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await AdminService.getStats();
        setStats(data);
      } catch (error) {
        toast.error('Erreur de chargement des statistiques', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div className="text-center p-6">Chargement des statistiques...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium text-gray-500">Commandes totales</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium text-gray-500">Chiffre d'affaires</h3>
          <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()} GNF</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium text-gray-500">Taux de conversion</h3>
          <p className="text-3xl font-bold">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Section activité */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Activité récente</h2>
        <p className="text-gray-600">Ici vous pourriez ajouter un graphique ou une liste des dernières commandes.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
