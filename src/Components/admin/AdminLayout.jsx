import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="p-4 mb-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Administration</h2>
          <p className="text-sm text-gray-400">{user?.name}</p>
        </div>
        <nav className="space-y-2">
          <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-700">
            Tableau de bord
          </Link>
          <Link to="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-700">
            Commandes
          </Link>
          <Link to="/" className="block px-4 py-2 mt-8 text-sm rounded hover:bg-gray-700">
            Retour au site
          </Link>
          <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-700">
  Utilisateurs
</Link>

        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
        
      </main>
    </div>
  );
};

export default AdminLayout;