import React from 'react';
import BilletLists from './BilletLists';
import {
  FaMusic,
  FaRunning,
  FaTheaterMasks,
  FaBus,
  FaTicketAlt
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="relative">
      {/* ✅ Hero Section */}
      <div className="relative h-64 md:h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4')] bg-cover bg-center opacity-70"></div>
        <div className="relative z-10 text-center px-6 py-8 bg-white bg-opacity-90 rounded-lg shadow-md max-w-xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <FaTicketAlt className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              <span className="text-blue-600">Buy Tickets</span> Online
            </h1>
          </div>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Your gateway to amazing events in Guinea and beyond
          </p>
        </div>
      </div>

   <hr className="my-8" />
<div className="bg-white py-8 mt-3">
  <div className="max-w-5xl mx-auto px-4">
    <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 text-center">

      {/* Music */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-2 shadow-sm">
          <FaMusic className="text-blue-600 text-xl" />
        </div>
        <span className="text-sm font-semibold text-gray-700">Music</span>
      </div>

      {/* Sports */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full mb-2 shadow-sm">
          <FaRunning className="text-green-600 text-xl" />
        </div>
        <span className="text-sm font-semibold text-gray-700">Sports</span>
      </div>

      {/* Theater */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-full mb-2 shadow-sm">
          <FaTheaterMasks className="text-purple-600 text-xl" />
        </div>
        <span className="text-sm font-semibold text-gray-700">Theater</span>
      </div>

      {/* Transport */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-full mb-2 shadow-sm">
          <FaBus className="text-orange-600 text-xl" />
        </div>
        <span className="text-sm font-semibold text-gray-700">Transport</span>
      </div>

    </div>
  </div>
</div>

      {/* ✅ Section des billets */}
      <div className="bg-gray-50 py-4 px-4 ">
        <BilletLists limit={6} />
      </div>
    </div>
  );
};

export default Home;
