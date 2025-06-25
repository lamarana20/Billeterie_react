import { Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-[70vh]">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner className="h-12 w-12 text-blue-500" />
          <p className="mt-4 text-gray-600">Chargement de la billetterie...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête avec effet dégradé */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-3xl font-bold">À propos de notre billetterie</h2>
            <p className="mt-2 opacity-90">Votre porte d'entrée vers des expériences inoubliables</p>
          </div>

          {/* Bulle d'information */}
          <div className="relative p-6">
            <div className="absolute -top-5 left-6 w-10 h-10 bg-blue-600 transform rotate-45"></div>
            
            <div className="bg-blue-50 rounded-lg p-6 shadow-inner border border-blue-100 relative z-10">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">MaBilletterie Pro</h3>
              <p className="text-gray-700 mb-4">
                Notre plateforme de billetterie en ligne vous offre une expérience d'achat sécurisée et intuitive 
                pour tous vos événements préférés. Conçue pour simplifier votre accès à la culture et aux loisirs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Billets mobiles instantanés</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Réservation en quelques clics</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Support client 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section supplémentaire */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Notre engagement</h3>
            <p className="text-gray-600">
              Fondée en {new Date().getFullYear()}, notre billetterie s'engage à fournir un service de qualité 
              avec une transparence totale sur les prix. Nous travaillons en direct avec les organisateurs 
              d'événements pour vous offrir les meilleures places au meilleur prix.
              (Fictif)
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <NavLink to="/events" className="text-white">
                Explorer les événements
              </NavLink>
              </button>
              <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                <a href="tel:+33123456789" className="text-blue-600">
                  Appelez-nous
                </a>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;