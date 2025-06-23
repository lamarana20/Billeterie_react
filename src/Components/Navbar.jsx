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
  const activeClass = "text-yellow-300 font-semibold";
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Ferme le menu mobile + panier à chaque navigation
  useEffect(() => {
    setIsOpen(false);
    setShowCart(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg"
              alt="Guinée" 
              className="w-8 h-8 mr-2 rounded-full border-2 border-white"
            />
            Billetterie Guinéenne
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className={({ isActive }) => `text-lg ${isActive ? activeClass : ''}`}>Accueil</NavLink>
            <NavLink to="/events" className={({ isActive }) => `text-lg ${isActive ? activeClass : ''}`}>Événements</NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-lg ${isActive ? activeClass : ''}`}>À propos</NavLink>

            {/* Panier */}
            <div className="relative">
             <NavLink
  to="/cart"
  onClick={() => setIsOpen(false)}
  className="block bg-white text-red-700 font-bold px-4 py-2 rounded shadow hover:bg-yellow-300 hover:text-white transition duration-300"
>
  🛒 Panier
  {totalItems > 0 && (
    <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold">
      {totalItems}
    </span>
  )}
</NavLink>
              {/* Dropdown panier */}
              {showCart && (
                <div className="absolute right-0 mt-2 w-[400px] max-h-[500px] bg-white text-black rounded shadow-xl z-50 overflow-auto">
                  <Cart />
                </div>
              )}
            </div>

            {/* Drapeau */}
            <div className="flex items-center ml-4">
              <span className="text-sm mr-2">GN</span>
              <div className="w-8 h-5 flex rounded overflow-hidden border border-white">
                <div className="w-1/3 bg-red-600"></div>
                <div className="w-1/3 bg-yellow-400"></div>
                <div className="w-1/3 bg-green-600"></div>
              </div>
            </div>
          </div>

          {/* Mobile menu icon */}
          <button onClick={toggleMenu} className="md:hidden text-white">
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
          <div className="md:hidden px-6 py-4 space-y-4 bg-gradient-to-b from-red-600 via-yellow-400 to-green-600 text-white rounded-b-md">
            <NavLink to="/" onClick={() => setIsOpen(false)} className="block">Accueil</NavLink>
            <NavLink to="/events" onClick={() => setIsOpen(false)} className="block">Événements</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className="block">À propos</NavLink>
          <NavLink to="/cart" onClick={() => setIsOpen(false)} className="block">Panier{totalItems > 0 && ` (${totalItems})`}</NavLink>
          </div>
        )}
      </nav>


 
    </>
  );
};

export default Navbar;
