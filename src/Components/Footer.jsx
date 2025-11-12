import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTicketAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

/**
 * Footer Component
 * Global footer with links, social media, and company information
 * Uses white background with dark text for clean, modern look
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Information */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaTicketAlt className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TicketHub
              </span>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your trusted partner for discovering and booking unforgettable experiences. 
              From concerts to sports events, we bring the world's best entertainment to your fingertips.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-400 transition-all duration-300"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-pink-600 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-700 transition-all duration-300"
                aria-label="Follow us on LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <FaEnvelope className="text-blue-500" />
                <span>support@tickethub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaPhone className="text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-red-500" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  All Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Event Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/events?category=Music" 
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Concerts & Music
                </Link>
              </li>
              <li>
                <Link 
                  to="/events?category=Sports" 
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Sports Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/events?category=Theater" 
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Theater & Arts
                </Link>
              </li>
              <li>
                <Link 
                  to="/events?category=Transport" 
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Transportation
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Support & Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Customer Support
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/refunds" 
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Refund Policy
                </Link>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Get updates on new events and exclusive offers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © {currentYear} TicketHub. All rights reserved.
              </p>
              <div className="hidden md:flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-gray-500 text-xs">Made with</span>
                <span className="text-red-500">❤️</span>
                <span className="text-gray-500 text-xs">for event lovers</span>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
              >
                Terms
              </Link>
              <Link 
                to="/sitemap" 
                className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
              >
                Sitemap
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 pt-6 border-t border-gray-300">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">$</span>
              </div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">24/7</span>
              </div>
              <span>Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;