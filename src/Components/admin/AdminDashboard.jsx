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

  if (loading) return <div>Chargement des statistiques...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium text-gray-500">Commandes totales</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium text-gray-500">Chiffre d'affaires</h3>
          <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()} GNF</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium text-gray-500">Taux de conversion</h3>
          <p className="text-3xl font-bold">{stats.conversionRate}%</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Activité récente</h2>
        {/* Ici vous pourriez ajouter un graphique ou une liste des dernières commandes */}
      </div>
    </div>
  );
};

export default AdminDashboard;