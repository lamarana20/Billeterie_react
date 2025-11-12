import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import ShopCartContext from "./Context/Shop-card-context";
import { SearchProvider } from "./Context/SearchContext";
import ProtectedRoute from "./Components/auth/ProtectedRoute";

import Navbar from "./Components/Navbar";
import Cart from "./Components/cart";
import BilletLists from "./Components/BilletLists";
import Home from "./Components/Home";
import About from "./Components/About";
import Events from "./Components/Events";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout";
import OrderConfirmation from "./Components/OrderConfirmation";
import OrderHistory from "./Components/OrderHistory";
import Login from "./Components/auth/Login";
import Profile from "./Components/auth/Profile";
import AdminLayout from "./Components/admin/AdminLayout";
import AdminDashboard from "./Components/admin/AdminDashboard";
import AdminOrders from "./Components/admin/AdminOrders";
import NotFound from "./Components/NotFound";
import MyOrders from "./Components/MyOrders";
import BilletDetail from "./Components/BilletDetail";
import SearchResults from "./Components/SearchResults";

/**
 * Main App Component
 * Sets up routing and global providers for the entire application
 */
const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <ShopCartContext>
          <div className="min-h-screen flex flex-col">
            {/* Global Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<SearchResults />} />

                {/* Event Routes */}
                <Route path="/billets" element={<BilletLists />} />
                <Route path="/billet/:id" element={<BilletDetail />} />

                {/* Protected Routes - Require Authentication */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />

                <Route path="/order-confirmation/:id" element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                } />
                <Route path="/my-orders" element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                } />
                
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Admin Routes - Require Admin Privileges */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>

                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Global Footer */}
            <Footer />
          </div>
        </ShopCartContext>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;