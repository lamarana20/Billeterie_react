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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => window.history.back()} 
              className="mb-4 text-indigo-600 hover:text-indigo-800"
              aria-label="Retour à la page précédente"
            >
              ← Retour
            </button> 
            <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Votre Panier
            </h2>
            
            <span 
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
              aria-live="polite"
            >
              {itemCount} {itemCount === 1 ? "article" : "articles"}
            </span>
          </div>

          {itemCount === 0 ? (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v2H4m0 12h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Votre panier est vide
              </h3>
              <p className="mt-1 text-gray-500">
                Commencez par ajouter quelques articles
              </p>
              <Link 
                to="/" 
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Retourner à la boutique
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    {total.toLocaleString()} GNF
                  </span>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Passer la commande
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
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