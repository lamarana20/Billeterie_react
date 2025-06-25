import { Outlet, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed z-40 md:static w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 mb-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Administration</h2>
          <p className="text-sm text-gray-400">{user?.name}</p>
        </div>
        <nav className="space-y-2">
          <Link 
  to="/admin"
  onClick={() => setSidebarOpen(false)} // Fermer après clic
  className="block px-4 py-2 rounded hover:bg-gray-700"
>
  Tableau de bord
</Link>

          <Link to="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)} >
            Commandes
          </Link>
          
          <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-700">
            Utilisateurs
          </Link>
          <Link to="/" className="block px-4 py-2 mt-8 text-sm rounded hover:bg-gray-700">
            Retour au site
          </Link>
        </nav>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barre du haut (visible sur mobile) */}
        <header className="md:hidden flex justify-between items-center bg-white shadow px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
          <h1 className="font-bold text-lg">Admin</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
