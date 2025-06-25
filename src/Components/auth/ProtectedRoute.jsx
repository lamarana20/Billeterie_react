import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, hasPermission } = useContext(AuthContext);

  if (loading) return <Spinner className="mx-auto mt-20" /> ;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !hasPermission('admin')) {
    toast.error('Accès réservé aux administrateurs');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;