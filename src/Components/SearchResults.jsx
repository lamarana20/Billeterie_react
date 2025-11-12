import React from 'react';
import { useSearch } from '../Context/SearchContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';

/**
 * Search Results Component
 * Displays search results with alternating background sections
 */
const SearchResults = () => {
  const { searchResults, searchTerm, searchLocation, clearSearch, isSearching } = useSearch();

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
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header Section - White background */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={clearSearch}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Search Results
              </h1>
              <p className="text-gray-600 mt-2">
                {searchResults.length} event(s) found for "{searchTerm}"
                {searchLocation !== 'All' && ` in ${searchLocation}`}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                onClick={clearSearch}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Gray background */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching events...</p>
            </div>
          )}

          {/* Search Results Grid */}
          {!isSearching && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((event) => (
                <Link
                  key={event.id}
                  to={`/billet/${event.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {event.category}
                      </span>
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    {/* Event Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {event.name}
                    </h3>
                    
                    {/* Event Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    {/* Event Metadata */}
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                        <span className="truncate">{event.location || "Online Event"}</span>
                      </div>
                      
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600 flex-shrink-0" />
                        <span>{event.date ? formatDate(event.date) : "Date TBA"}</span>
                      </div>
                    </div>
                    
                    {/* Price and Availability */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <FaTicketAlt className="text-green-600" />
                        <span className="text-blue-600 font-bold text-lg">
                          {formatPrice(event.price)}
                        </span>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        Available
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !isSearching && (
            /* No Results State - White background */
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="text-gray-400 text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No Events Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We couldn't find any events matching your search criteria. Try adjusting your search terms or location filter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearSearch}
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
                <Link
                  to="/events"
                  className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Browse All Events
                </Link>
              </div>
            </div>
          )}

          {/* Search Tips - White background */}
          {!isSearching && searchResults.length > 0 && (
            <div className="mt-8 text-center bg-white rounded-2xl shadow-sm p-6">
              <p className="text-sm text-gray-500">
                Can't find what you're looking for? Try different keywords or{' '}
                <button
                  onClick={clearSearch}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  browse all events
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;