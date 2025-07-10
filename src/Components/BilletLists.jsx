import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/Shop-card-context";
import { Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const BilletLists = ({ limit }) => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await import("../data/billets.json");
        setProducts(response.default);
      } catch (error) {
        console.error("Erreur de chargement des billets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extraction des catégories uniques + ajout option "Tous"
  const categories = ["Tous", ...new Set(products.map((p) => p.category))];

  // Filtrage selon la catégorie sélectionnée
  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Application de la limite éventuelle
  const visibleProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <section className="py-6 px-3 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-6 px-3 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p>Aucun événement disponible pour le moment</p>
        </div>
      </section>
    );
  }

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

        {/* Filtre catégorie */}
      <div className="mb-6 flex justify-center gap-3 flex-wrap">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition
        ${
          selectedCategory === cat
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
    >
      {cat}
    </button>
  ))}
</div>

        {/* Cartes */}
        <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <Link to={`/billet/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200">
                <div className="relative h-40 sm:h-48">
                  <img
                    src={product.image}
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
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="text-base sm:text-lg font-bold text-gray-800 truncate whitespace-nowrap max-w-[70%] cursor-pointer"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      <span className="text-blue-600 font-semibold text-sm sm:text-base whitespace-nowrap">
                        {product.price.toLocaleString()} GNF
                      </span>
                    </div>

                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-2 sm:mt-3 flex justify-between text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {product.location || "En ligne"}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {product.date
                          ? new Date(product.date).toLocaleDateString("fr-FR")
                          : "Bientôt disponible"}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 sm:mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition duration-300 text-sm sm:text-base"
                  >
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BilletLists;
