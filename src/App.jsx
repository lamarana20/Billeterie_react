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
      <div className="min-h-screen flex flex-col my-0 mx-auto">
        <Navbar />

        <main className="flex mx-auto  p-6 font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ShopCartContext>
  );
};

export default App;
