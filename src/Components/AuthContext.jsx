import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const demoUsers = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Administrateur',
      phone: '041234567494',
      role: 'admin',
      
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user123',
      name: 'lamarana',
      role: 'user',
      phone: '0123456789',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      email: 'user2@example.com',
      password: 'user123',
      name: 'lamarana 2',
      role: 'user',
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erreur d'authentification", error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (!user) throw new Error('Email ou mot de passe incorrect');
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Bienvenue ${user.name}`);
      return user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Déconnexion réussie');
  };

  const hasPermission = (requiredRole) => {
    return user?.role === requiredRole;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};