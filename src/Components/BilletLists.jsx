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
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">🎉 Événements Exceptionnels</h2>
          <p className="mt-2 text-xl text-green-600 font-semibold">
            Réservez vos billets en toute simplicité
          </p>
          <p className="mt-4 max-w-2xl text-gray-500 mx-auto">
            Concerts, festivals, spectacles, sports... Soyez au cœur de l’action.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-48">
                <img
                  src={eventImages[index % eventImages.length]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-0 p-3">
                  <span className="text-xs font-semibold bg-white text-green-700 px-3 py-1 rounded-full">
                    🎟️ Billet disponible
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <span className="text-green-600 font-semibold text-sm">
                      {product.price.toLocaleString()} GNF
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  <div className="mt-3 flex justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {product.location || "En ligne"}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                {new Date(product.date).toLocaleDateString('fr-FR') || "À venir"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md shadow"
                >
                  Ajouter au panier
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
