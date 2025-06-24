import { useContext } from "react";
import { CartContext } from "../Context/Shop-card-context";

const BilletLists = ({ limit }) => {
  const { addToCart, products } = useContext(CartContext);
  const visibleProducts = limit ? products.slice(0, limit) : products;
  const eventImages = [
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=500&q=60",
  ];

  return (
    <section className="py-6 px-3 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            <span className="text-blue-600">Événements</span> Populaires
          </h2>
          <p className="mt-2 text-sm sm:text-lg text-gray-600">
            Découvrez et réservez des billets pour les événements à venir
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200"
            >
              <div className="relative h-40 sm:h-48">
                <img
                  src={eventImages[index % eventImages.length]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 p-2 sm:p-3">
                  <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    Disponible
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{product.name}</h3>
                    <span className="text-blue-600 font-semibold text-sm sm:text-base">
                      {product.price.toLocaleString()} GNF
                    </span>
                  </div>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  <div className="mt-2 sm:mt-3 flex justify-between text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {product.location || "En ligne"}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(product.date).toLocaleDateString('fr-FR') || "Bientôt disponible"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 sm:mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition duration-300 text-sm sm:text-base"
                >
                  Ajouter au Panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      
  );
};

export default BilletLists;