import React, { useEffect } from 'react';
import { useSearch } from '../Context/SearchContext';
import BilletLists from './BilletLists';

/**
 * Events Page Component
 * Displays all available events with alternating background sections
 */
const Events = () => {
  const { 
    searchTerm, 
    clearSearch,
    allEvents,
    eventsLoaded 
  } = useSearch();

  // Clear any active search when visiting events page directly
  useEffect(() => {
    if (searchTerm) {
      clearSearch();
    }
  }, [searchTerm, clearSearch]);

  return (
    <div className="min-h-screen">
      {/* Page Header - White background */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All <span className="text-blue-600">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of events. From concerts to sports, 
              theater to transportation - find your perfect experience.
            </p>
            
            {/* Events Count */}
            {eventsLoaded && (
              <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                <span className="font-semibold">{allEvents.length}</span>
                <span>events available</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events Listing Section - Gray background */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <BilletLists />
        </div>
      </section>

      {/* Help Section - White background */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Finding the Perfect Event?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Use the search bar in the navigation to find specific events, artists, or categories. 
            Our advanced search makes it easy to discover exactly what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Top
            </button>
            <a
              href="mailto:support@tickethub.com"
              className="border-2 border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;