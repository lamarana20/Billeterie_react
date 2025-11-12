import React from 'react';
import { useSearch } from '../Context/SearchContext';
import {
  FaMusic,
  FaRunning,
  FaTheaterMasks,
  FaBus
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import Hero from './Hero';
import BilletLists from './BilletLists';
import SearchResults from './SearchResults';

/**
 * Home Component
 * Main landing page featuring hero section, category icons, and event listings
 * Uses blue color scheme throughout for consistent branding
 */
const Home = () => {
  const { 
    searchTerm, 
    searchByCategory
  } = useSearch();

  /**
   * Handle category icon click
   * @param {string} category - Category to search for
   */
  const handleCategoryClick = (category) => {
    searchByCategory(category);
  };

  // If search is active, display search results instead of home content
  if (searchTerm) {
    return <SearchResults />;
  }

  return (
    <div className="relative">
      {/* Hero Section with gradient background */}
      <Hero />

      {/* Categories Section - White background */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing events across different categories. Find exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Music Category */}
            <div 
              onClick={() => handleCategoryClick('Music')}
              className="group flex flex-col items-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-lg"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-2xl mb-4 shadow-sm group-hover:bg-blue-200 transition-colors">
                <FaMusic className="text-blue-600 text-3xl" />
              </div>
              <span className="text-base font-semibold text-gray-800 group-hover:text-blue-700">Concerts & Music</span>
              <p className="text-sm text-gray-500 mt-2 text-center">Live concerts, festivals, DJ sets</p>
            </div>

            {/* Sports Category */}
            <div 
              onClick={() => handleCategoryClick('Sports')}
              className="group flex flex-col items-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-lg"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-2xl mb-4 shadow-sm group-hover:bg-blue-200 transition-colors">
                <FaRunning className="text-blue-600 text-3xl" />
              </div>
              <span className="text-base font-semibold text-gray-800 group-hover:text-blue-700">Sports Events</span>
              <p className="text-sm text-gray-500 mt-2 text-center">Games, matches, tournaments</p>
            </div>

            {/* Theater Category */}
            <div 
              onClick={() => handleCategoryClick('Theater')}
              className="group flex flex-col items-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-lg"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-2xl mb-4 shadow-sm group-hover:bg-blue-200 transition-colors">
                <FaTheaterMasks className="text-blue-600 text-3xl" />
              </div>
              <span className="text-base font-semibold text-gray-800 group-hover:text-blue-700">Theater & Arts</span>
              <p className="text-sm text-gray-500 mt-2 text-center">Plays, musicals, performances</p>
            </div>

            {/* Transport Category */}
            <div 
              onClick={() => handleCategoryClick('Transport')}
              className="group flex flex-col items-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-lg"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-2xl mb-4 shadow-sm group-hover:bg-blue-200 transition-colors">
                <FaBus className="text-blue-600 text-3xl" />
              </div>
              <span className="text-base font-semibold text-gray-800 group-hover:text-blue-700">Transport & Travel</span>
              <p className="text-sm text-gray-500 mt-2 text-center">Bus, train, flight tickets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section - Gray background */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-600">Events</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our most popular events. Limited tickets available for these exclusive experiences.
            </p>
          </div>

          <BilletLists limit={6} />

          {/* Call to Action */}
          <div className="flex justify-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center gap-3 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Explore All Events
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - White background */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">TicketHub</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best ticket booking experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Booking</h3>
              <p className="text-gray-600">
                Your transactions are protected with industry-leading security measures and encryption.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Delivery</h3>
              <p className="text-gray-600">
                Receive your tickets instantly via email or mobile app after purchase.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue background */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Unforgettable Memories?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover events that will create lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse All Events
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;