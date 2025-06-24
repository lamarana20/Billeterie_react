import React, { useContext } from "react";
import { CartContext } from "../Context/Shop-card-context";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="py-6 flex flex-col sm:flex-row transition hover:bg-gray-50 px-2 rounded">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {item.price.toLocaleString()} GNF chacun
            </p>
          </div>
          <p className="text-lg font-semibold text-indigo-600">
            {(item.price * item.quantity).toLocaleString()} GNF
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:justify-start">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
              aria-label="Diminuer la quantité"
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="px-4 py-1 text-gray-900 font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium"
            aria-label="Supprimer cet article"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
