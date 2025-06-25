import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react'; // icône moderne (si tu utilises Lucide)

const NotFound = () => {
  return (
    <div className="h-full flex flex-col  items-center text-center px-4">
      <AlertTriangle size={64} className="text-yellow-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page introuvable</h1>
      <p className="text-gray-600 mb-6">
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </Link>
      <p className="text-gray-600 mt-6">
        Si vous pensez que c'est une erreur, n'hésitez pas à nous contacter.
      </p>
      <p className="text-gray-600 mt-2">
        <a href="mailto:contact@example.com" className="text-blue-600 hover:underline">
            contact@example.com
        </a>
        </p>
    </div>
  );
};

export default NotFound;
