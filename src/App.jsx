import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import ShopCartContext from "./Context/Shop-card-context";
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
//import Register from "./Components/auth/Register";
import Profile from "./Components/auth/Profile";
import AdminLayout from "./Components/admin/AdminLayout";
import AdminDashboard from "./Components/admin/AdminDashboard";
import AdminOrders from "./Components/admin/AdminOrders";
import NotFound from "./Components/NotFound";
import MyOrders from "./Components/MyOrders";
//import UsersList from "./Components/UsersList";

const App = () => {
  return (
    <AuthProvider>
      <ShopCartContext>
        <div className="min-h-screen flex flex-col my-0 mx-auto">
          <Navbar />

          <main className="flex-1 ml-2 mr-2">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            

              <Route path="/billets" element={<BilletLists />} />

              {/* Routes protégées */}
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

              {/* Routes admin */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }>
               
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
             
              </Route>

              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </ShopCartContext>
    </AuthProvider>
  );
};

export default App;