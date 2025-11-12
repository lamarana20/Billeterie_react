import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Hero Component
 * Simple banner section with branding and call-to-action
 * Uses blue color scheme throughout for consistent branding
 * Search functionality is now in the navbar
 */
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100">
              Great Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover concerts, sports events, theater shows, and much more. 
            Your next unforgettable moment is just a click away.
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-8 md:gap-16 mb-12 text-white">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">10K+</p>
            <p className="text-blue-200 text-sm md:text-base">Events Available</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">500K+</p>
            <p className="text-blue-200 text-sm md:text-base">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">50+</p>
            <p className="text-blue-200 text-sm md:text-base">Cities Covered</p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/events"
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 hover:bg-blue-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse All Events
          </Link>
          <Link
            to="/about"
            className="border-2 border-blue-200 text-blue-100 font-bold py-4 px-8 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-blue-400/40">
          <p className="text-blue-200 text-sm mb-6">Trusted by thousands of event organizers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-90">
            <div className="text-blue-100 font-semibold text-lg">Live Nation</div>
            <div className="text-blue-100 font-semibold text-lg">Ticketmaster</div>
            <div className="text-blue-100 font-semibold text-lg">Eventbrite</div>
            <div className="text-blue-100 font-semibold text-lg">StubHub</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25" 
                className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5" 
                className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;