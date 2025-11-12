import React from 'react';
import {
  FaShieldAlt,
  FaTicketAlt,
  FaHeadset,
  FaAward,
  FaRocket,
  FaUsers,
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-700 to-blue-500 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About <span className="text-yellow-400">TicketEase</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-blue-100">
            We’re redefining how people discover and book tickets for unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At TicketEase, we believe everyone deserves access to amazing experiences — from concerts that
              move your soul to sports events that make your heart race. Our goal is to make it simple,
              secure, and enjoyable for anyone to attend the events they love.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2020, we’ve helped over 500,000 customers enjoy unforgettable moments.
              Our platform connects you with the best local and international events with top-notch reliability.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <FaUsers className="text-blue-600 text-4xl mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">500K+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <FaTicketAlt className="text-green-600 text-4xl mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <p className="text-gray-600">Events Listed</p>
              </div>
              <div className="text-center">
                <FaAward className="text-purple-600 text-4xl mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div className="text-center">
                <FaRocket className="text-orange-600 text-4xl mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <p className="text-gray-600">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at TicketEase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-8 text-center transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Security</h3>
              <p className="text-gray-600">
                Your security is our top priority. We use industry-leading encryption to ensure every transaction is safe.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-8 text-center transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaTicketAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Selection</h3>
              <p className="text-gray-600">
                From local shows to international tours, we offer a wide selection of events for every taste and budget.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-8 text-center transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is available around the clock to assist you with any questions or issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-700 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563298723-dcfebaa392e3')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Experience?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover events that create lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/events"
              className="bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Browse Events
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
