import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Spinner } from "@material-tailwind/react";
import { CartContext } from "../Context/Shop-card-context";

const BilletDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [billet, setBillet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillet = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await import("../data/billets.json");
        const foundBillet = response.default.find((b) => b.id === parseInt(id));
        if (foundBillet) {
          setBillet(foundBillet);
          setError(null);
        } else {
          setError("Billet non trouvé");
        }
      } catch (err) {
        setError("Erreur de chargement du billet");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBillet();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(billet);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-14 w-14" aria-label="Chargement en cours" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!billet) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-gray-700 text-lg">Aucun billet trouvé.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image en haut, responsive */}
        <div className="w-full h-64 sm:h-80 md:h-96 relative">
          <img
            src={billet.image}
            alt={billet.name}
            className="w-full h-full object-cover rounded-t-xl"
            loading="lazy"
          />
        </div>

        <div className="p-8 flex flex-col space-y-6">
          <div>
            <p className="uppercase tracking-widest text-blue-600 font-semibold text-xs mb-2">
              Billet d'événement
            </p>
            <h1 className="text-3xl font-extrabold text-gray-900">{billet.name}</h1>
            <p className="mt-4 text-gray-700 leading-relaxed">{billet.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between text-gray-700 text-sm sm:text-base gap-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-blue-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              <span>{billet.location}</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-blue-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={billet.date}>
                {new Date(billet.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>

        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-3">
  <span className="text-3xl font-extrabold text-gray-900">
    {billet.price.toLocaleString()} GNF
  </span>
  <button
    onClick={handleAddToCart}
    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 flex-shrink-0"
    aria-label={`Ajouter ${billet.name} au panier`}
  >
    Ajouter au Panier
  </button>
</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Détails supplémentaires</h2>
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Conditions d'annulation</h3>
          <p>Annulation gratuite jusqu'à 48h avant l'événement</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Accès</h3>
          <p>Présentez ce billet à l'entrée de l'événement</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Contact</h3>
          <p>contact@evenements.com | +224 123 456 789(fictif)</p>
        </div>
      </div>
    </section>
  );
};

export default BilletDetail;
