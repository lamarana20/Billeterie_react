import { useContext,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../../Context/Shop-card-context';
import { Spinner } from '@material-tailwind/react';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  
  if (!user) return null;

  const handleLogout = () => {
    logout();
    clearCart();
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Informations personnelles</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Nom:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Téléphone:</span> {user.phone || 'Non renseigné'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Statut</h2>
            <p className="mb-2">
              <span className="font-medium">Rôle:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                user.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
              </span>
            </p>
            <p>
              <span className="font-medium">Membre depuis:</span> 
              {user.createdAt 
                ? new Date(user.createdAt).toLocaleDateString() 
                : 'Date inconnue'}
            </p>
          </div>
        </div>

        <div className="border-t pt-3 flex flex-row gap-3 text-sm">
          <Link
            to="/orders"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Mes Commandes
          </Link>
          
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Interface Admin
            </Link>
          )}
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;