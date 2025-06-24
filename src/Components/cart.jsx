import React, { useContext, useMemo } from "react";
import { CartContext } from "../Context/Shop-card-context";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const calculateTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const Cart = () => {
  const { cart } = useContext(CartContext);

  const total = useMemo(() => calculateTotal(cart), [cart]);
  const itemCount = cart.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continuer les achats
            </button>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Votre panier</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center">
                {itemCount} {itemCount <= 1 ? "article" : "articles"}
              </span>
            </div>
          </div>

          {/* Si vide */}
          {itemCount === 0 ? (
            <div className="text-center py-16 space-y-6">
              <svg className="h-20 w-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7h-4V5a3 3 0 00-3-3H11a3 3 0 00-3 3v2H4v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900">Votre panier est vide</h3>
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Explorer les événements
              </Link>
            </div>
          ) : (
            <>
              {/* Liste des articles */}
              <div className="divide-y divide-gray-200 space-y-6">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Récapitulatif */}
              <div className="mt-10 border-t pt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-600">Sous-total</span>
                  <span className="text-xl font-bold text-gray-900">{total.toLocaleString()} GNF</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Taxes et frais appliqués au moment du paiement.</p>

                <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg">
                  Procéder au paiement
                </button>

                <div className="text-center mt-6">
                  <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    ⬅️ Continuer vos achats
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;