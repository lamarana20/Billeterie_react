import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../Context/Shop-card-context';
import { AuthContext } from './AuthContext';
import { useSearch } from '../Context/SearchContext';
import { 
  FaShoppingCart, 
  FaBell,
  FaBars,
  FaTimes,
  FaHeart,
  FaTicketAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaCog,
  FaSearch,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * Navigation Bar Component
 * Includes search functionality, user menu, and mobile responsiveness
 * Features global search with location filtering and user authentication
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [localLocation, setLocalLocation] = useState('All');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { cart } = useContext(CartContext);
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const { performSearch, searchResults, isSearching, clearSearch } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Active state classes for navigation links
  const activeClass = "text-blue-600 font-semibold border-b-2 border-blue-600";
  const inactiveClass = "text-gray-700 hover:text-blue-600 font-medium transition-colors";

  // Mobile active state classes
  const mobileActiveClass = "bg-blue-50 text-blue-600 border-r-4 border-blue-600";
  const mobileInactiveClass = "text-gray-700 hover:bg-gray-50";

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close all menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setShowUserMenu(false);
  };

  /**
   * Handle search form submission
   * @param {Event} e - Form submit event
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      performSearch(localSearchTerm, localLocation);
      setSearchOpen(true);
    }
  };

  /**
   * Handle click on search result
   * @param {Object} event - Event object
   */
  const handleResultClick = (event) => {
    navigate(`/billet/${event.id}`);
    setSearchOpen(false);
    setLocalSearchTerm('');
    clearSearch();
  };

  /**
   * Close search panel
   */
  const handleCloseSearch = () => {
    setSearchOpen(false);
    clearSearch();
  };

  /**
   * Get user initials for avatar display
   * @returns {string} User initials
   */
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    return names.length > 1 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaTicketAlt className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                TicketHub
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 h-full">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `py-2 px-1 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
                end
              >
                Home
              </NavLink>

              <NavLink 
                to="/events" 
                className={({ isActive }) => 
                  `py-2 px-1 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                Events
              </NavLink>

              <NavLink 
                to="/billets" 
                className={({ isActive }) => 
                  `py-2 px-1 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                All Tickets
              </NavLink>

              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `py-2 px-1 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                About
              </NavLink>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  searchOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                aria-label="Search events"
              >
                <FaSearch />
              </button>

              {/* Favorites Link */}
              <NavLink
                to="/favorites"
                className={({ isActive }) => 
                  `w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`
                }
                aria-label="My favorites"
              >
                <FaHeart />
              </NavLink>

              {/* Notifications Button */}
              <button 
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center relative transition-colors"
                aria-label="Notifications"
              >
                <FaBell className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              {/* Shopping Cart Link */}
              <NavLink
                to="/cart"
                className={({ isActive }) => 
                  `w-10 h-10 rounded-full flex items-center justify-center relative transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`
                }
                aria-label="Shopping cart"
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </NavLink>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
                    aria-label="User menu"
                  >
                    {getUserInitials()}
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      {/* User Information */}
                      <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-purple-50 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-600">{user?.email || 'user@example.com'}</p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <NavLink
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FaUserCircle className="text-blue-600" />
                          <span className="text-sm font-medium">My Profile</span>
                        </NavLink>
                        <NavLink
                          to="/my-tickets"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FaTicketAlt className="text-blue-600" />
                          <span className="text-sm font-medium">My Tickets</span>
                        </NavLink>
                        <NavLink
                          to="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FaShoppingCart className="text-blue-600" />
                          <span className="text-sm font-medium">Order History</span>
                        </NavLink>
                        <NavLink
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FaCog className="text-blue-600" />
                          <span className="text-sm font-medium">Settings</span>
                        </NavLink>
                      </div>
                      
                      {/* Logout Section */}
                      <div className="border-t border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Login Button for non-authenticated users
                <Link
                  to="/login"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 relative"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Expandable Search Bar (Desktop) */}
          {searchOpen && (
            <div className="hidden md:block border-t border-gray-200 py-4">
              <form onSubmit={handleSearchSubmit} className="flex gap-3 mb-4">
                {/* Search Input */}
                <div className="flex-1 flex items-center px-4 py-3 bg-gray-100 rounded-lg">
                  <FaSearch className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search events, artists, categories..."
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-700"
                    autoFocus
                  />
                </div>
                
                {/* Location Filter */}
                <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg w-48">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  <select
                    className="flex-1 bg-transparent outline-none text-gray-700"
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                  >
                    <option value="All">All Locations</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Miami">Miami</option>
                    <option value="Nashville">Nashville</option>
                    <option value="San Jose">San Jose</option>
                    <option value="Austin">Austin</option>
                    <option value="Seattle">Seattle</option>
                    <option value="Atlanta">Atlanta</option>
                  </select>
                </div>
                
                {/* Search Button */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
                
                {/* Close Search Button */}
                <button
                  type="button"
                  onClick={handleCloseSearch}
                  className="px-4 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                  aria-label="Close search"
                >
                  <FaTimes />
                </button>
              </form>

              {/* Search Results Display */}
              {isSearching ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Searching events...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Found {searchResults.length} event(s)
                  </h3>
                  <div className="grid gap-2">
                    {searchResults.slice(0, 5).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleResultClick(event)}
                        className="flex items-center gap-3 p-2 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer"
                      >
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{event.name}</h4>
                          <p className="text-xs text-gray-600">{event.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-blue-600 text-sm">
                            ${event.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : localSearchTerm && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No events found for "{localSearchTerm}"
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white overflow-y-auto">
          <div className="p-4">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaTicketAlt className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TicketHub
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                aria-label="Close mobile menu"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="mb-6">
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-6">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive ? mobileActiveClass : mobileInactiveClass
                }`}
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/events"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive ? mobileActiveClass : mobileInactiveClass
                }`}
              >
                Events
              </NavLink>
              <NavLink
                to="/billets"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive ? mobileActiveClass : mobileInactiveClass
                }`}
              >
                All Tickets
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive ? mobileActiveClass : mobileInactiveClass
                }`}
              >
                About
              </NavLink>
            </div>

            {/* Mobile User Section */}
            {isAuthenticated ? (
              <div className="space-y-1 mb-6 border-t border-gray-200 pt-6">
                <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-3">
                  <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaUserCircle className="text-blue-600" />
                  <span className="font-medium">My Profile</span>
                </NavLink>
                <NavLink
                  to="/my-tickets"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaTicketAlt className="text-blue-600" />
                  <span className="font-medium">My Tickets</span>
                </NavLink>
                <NavLink
                  to="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaShoppingCart className="text-blue-600" />
                  <span className="font-medium">Order History</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all mb-6"
              >
                Login
              </Link>
            )}

            {/* Mobile Quick Actions */}
            <div className="grid grid-cols-4 gap-3 border-t border-gray-200 pt-6">
              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center gap-2 bg-gray-100 py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <div className="relative">
                  <FaShoppingCart className="text-blue-600 text-xl" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-700">Cart</span>
              </NavLink>
              <NavLink
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center gap-2 bg-gray-100 py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <FaHeart className="text-blue-600 text-xl" />
                <span className="text-xs font-semibold text-gray-700">Favorites</span>
              </NavLink>
              <button className="flex flex-col items-center gap-2 bg-gray-100 py-4 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="relative">
                  <FaBell className="text-blue-600 text-xl" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-700">Alerts</span>
              </button>
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex flex-col items-center gap-2 bg-gray-100 py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <FaSearch className="text-blue-600 text-xl" />
                <span className="text-xs font-semibold text-gray-700">Search</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;