import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ShopCartContext from './Context/Shop-card-context';

import Navbar from './Components/Navbar';
import Cart from './Components/cart';
import BilletLists from './Components/BilletLists';
import Home from './Components/Home';
import About from './Components/About';
import Events from './Components/Events';
import CartPage from './Components/CartPage';
import Footer from './Components/Footer';

const App = () => {
  return (
    <ShopCartContext>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow max-w-6xl mx-auto p-6 font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ShopCartContext>
  );
};

export default App;
