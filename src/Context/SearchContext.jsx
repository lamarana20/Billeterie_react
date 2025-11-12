import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Search Context
const SearchContext = createContext();

/**
 * Custom hook to use search context
 * @returns {Object} Search context values and methods
 */
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

/**
 * Search Provider Component
 * Manages global search state and operations
 */
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  // Load events data on component mount
  useEffect(() => {
    loadAllEvents();
  }, []);

  /**
   * Load all events from local JSON file
   * @returns {Promise<Array>} Array of events
   */
  const loadAllEvents = async () => {
    if (eventsLoaded) return allEvents;
    
    try {
      console.log('Loading events from billets.json...');
      setIsSearching(true);
      
      // Dynamic import of JSON file
      const eventsData = await import("../data/billets.json");
      console.log('Events loaded:', eventsData.default);
      
      setAllEvents(eventsData.default);
      setEventsLoaded(true);
      return eventsData.default;
    } catch (error) {
      console.error("Error loading events:", error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Perform search across events
   * @param {string} term - Search term
   * @param {string} location - Location filter
   */
  const performSearch = async (term, location = 'All') => {
    console.log('Performing search:', { term, location });
    
    if (!term.trim()) {
      console.log('Empty search term - clearing search');
      clearSearch();
      return;
    }

    setIsSearching(true);
    setSearchTerm(term);
    setSearchLocation(location);

    try {
      // Ensure events are loaded
      let events = allEvents;
      if (!eventsLoaded) {
        console.log('Events not loaded yet, loading...');
        events = await loadAllEvents();
      }

      console.log('Filtering through', events.length, 'events');

      // Filter results based on search criteria
      const filtered = events.filter((event) => {
        const searchTermLower = term.toLowerCase();
        
        const matchesName = event.name?.toLowerCase().includes(searchTermLower) || false;
        const matchesCategory = event.category?.toLowerCase().includes(searchTermLower) || false;
        const matchesDescription = event.description?.toLowerCase().includes(searchTermLower) || false;
        const matchesLocation = location === "All" || 
          event.location?.toLowerCase().includes(location.toLowerCase()) || false;

        return (matchesName || matchesCategory || matchesDescription) && matchesLocation;
      });

      console.log('Search results found:', filtered.length);
      setSearchResults(filtered);
      
    } catch (err) {
      console.error("Error during search:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Search events by specific category
   * @param {string} category - Category to filter by
   */
  const searchByCategory = async (category) => {
    console.log('Searching by category:', category);
    
    setIsSearching(true);
    setSearchTerm(category);
    setSearchLocation('All');

    try {
      // Ensure events are loaded
      let events = allEvents;
      if (!eventsLoaded) {
        events = await loadAllEvents();
      }
      
      const filtered = events.filter((event) => 
        event.category?.toLowerCase() === category.toLowerCase()
      );

      console.log('Category results:', filtered.length);
      setSearchResults(filtered);
    } catch (err) {
      console.error("Error during category search:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Clear search results and reset search state
   */
  const clearSearch = () => {
    console.log('Clearing search');
    setSearchResults([]);
    setSearchTerm('');
    setSearchLocation('All');
    setIsSearching(false);
  };

  // Context value to be provided
  const value = {
    searchResults,
    searchTerm,
    searchLocation,
    isSearching,
    allEvents,
    eventsLoaded,
    performSearch,
    searchByCategory,
    loadAllEvents,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};