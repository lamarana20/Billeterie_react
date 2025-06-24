import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../Context/Shop-card-context';
import Cart from './cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const activeClass = "text-blue-600 font-semibold";
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Ferme le menu mobile + panier à chaque navigation
  useEffect(() => {
    setIsOpen(false);
    setShowCart(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
             <h3 className="text-xl font-bold">Billets En Ligne</h3>
          </Link>
          {/* Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={({ isActive }) => `text-lg hover:text-blue-600 ${isActive ? activeClass : ''}`}>Accueil</NavLink>
            <NavLink to="/events" className={({ isActive }) => `text-lg hover:text-blue-600 ${isActive ? activeClass : ''}`}>Événements</NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-lg hover:text-blue-600 ${isActive ? activeClass : ''}`}>À propos</NavLink>

            {/* Panier */}
            <div className="relative">
             <NavLink to="/cart" className="text-lg hover:text-blue-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                  {totalItems}
                </span>
              )}
                </NavLink>
              {/* Dropdown panier */}
              {showCart && (
                <div className="absolute right-0 mt-3 w-[700px] max-h-[500px] bg-white text-black rounded shadow-xl z-50 overflow-auto ">
                  <Cart />
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu icon */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-6 py-4 space-y-4 bg-white text-gray-800 border-t">
            <NavLink to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">Accueil</NavLink>
            <NavLink to="/events" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">Événements</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">À propos</NavLink>
            <NavLink to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">Panier{totalItems > 0 && ` (${totalItems})`}</NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;