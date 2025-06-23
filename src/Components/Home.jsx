import React from 'react';
import BilletLists from './BilletLists';

const Home = () => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Accueil</h2>
      <p className="text-lg text-gray-600 mb-8">
        Bienvenue sur <span className="font-semibold text-green-700">Billetterie Guinée</span>, 
        votre plateforme de réservation d’événements !
      </p>

      <BilletLists limit={6} />
    </div>
  );
};

export default Home;
