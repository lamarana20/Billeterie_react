import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/Shop-card-context";
import { useSearch } from "../Context/SearchContext";
import { Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";

/**
 * BilletLists Component
 * Displays a filterable grid of event tickets with alternating background support
 * Uses blue color scheme throughout for consistent branding
 * 
 * @param {number} limit - Optional limit for number of products to display
 * @param {string} backgroundColor - Background color class (bg-white, bg-gray-50, etc.)
 */
const BilletLists = ({ limit, backgroundColor = "bg-white" }) => {
  const { addToCart } = useContext(CartContext);
  const { allEvents, eventsLoaded, isSearching } = useSearch();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load products when events are loaded
  useEffect(() => {
    if (eventsLoaded && allEvents.length > 0) {
      setProducts(allEvents);
      setLoading(false);
    } else if (eventsLoaded && allEvents.length === 0) {
      setProducts([]);
      setLoading(false);
    }
  }, [eventsLoaded, allEvents]);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setProducts(allEvents);
    } else {
      const filtered = allEvents.filter(event => 
        event.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setProducts(filtered);
    }
  }, [selectedCategory, allEvents]);

  // Extract unique categories for filter buttons
  const categories = ["All", ...new Set(allEvents.map((p) => p.category))];

  // Apply optional limit to visible products
  const visibleProducts = limit
    ? products.slice(0, limit)
    : products;

  /**
   * Handle add to cart button click
   * @param {Event} e - Click event
   * @param {Object} product - Product to add to cart
   */
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  /**
   * Format price with proper currency formatting
   * @param {number} price - Event price
   * @returns {string} Formatted price string
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  /**
   * Format date to readable format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading state display
  if (loading || isSearching) {
    return (
      <section className={`py-12 ${backgroundColor}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center">
            <Spinner className="h-12 w-12 text-blue-600" />
            <span className="ml-4 text-gray-600">Loading events...</span>
          </div>
        </div>
      </section>
    );
  }

  // Empty state display
  if (products.length === 0) {
    return (
      <section className={`py-12 ${backgroundColor}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm py-16">
            <div className="text-blue-400 text-6xl mb-6">🎭</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Events Available
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {allEvents.length === 0 
                ? 'We are currently updating our event listings. Please check back soon.' 
                : 'No events found for the selected category.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-8 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 shadow-sm"
              }`}
            >
              {cat} {cat !== "All" && `(${allEvents.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 group"
            >
              {/* Event Card - Clickable Link */}
              <Link to={`/billet/${product.id}`} className="flex-1 flex flex-col">
                {/* Product Image with Overlay */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Availability Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                      Available
                    </span>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    {/* Product Name and Price */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3
                        className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      <span className="text-blue-600 font-bold text-lg whitespace-nowrap flex-shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Product Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Location and Date Information */}
                    <div className="space-y-2 text-sm text-gray-500">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-blue-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate">{product.location || "Online Event"}</span>
                      </div>
                      
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-blue-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">
                          {formatDate(product.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button - Separate from the link */}
              <div className="p-5 pt-0">
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-base">Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BilletLists;