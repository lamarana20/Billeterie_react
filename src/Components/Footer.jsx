import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Bloc 1 */}
        <div>
          <h3 className="text-xl font-bold mb-3">Billetterie Guinéenne</h3>
          <p className="text-sm">
            Achetez vos billets en ligne pour les événements les plus populaires de Guinée : concerts, spectacles, festivals, et bien plus !
          </p>
        </div>

        {/* Bloc 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Liens rapides</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Accueil</Link></li>
            <li><Link to="/events" className="hover:underline">Événements</Link></li>
            <li><Link to="/about" className="hover:underline">À propos</Link></li>
            <li><Link to="/cart" className="hover:underline">Panier</Link></li>
          </ul>
        </div>

        {/* Bloc 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Conakry, République de Guinée</li>
            <li>📧 contact@billetteriegn.com</li>
            <li>📞 +224 620 00 00 00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/30 py-4 text-center text-sm">
        © {new Date().getFullYear()} Billetterie Guinéenne. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
