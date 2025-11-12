import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/Shop-card-context";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaArrowLeft,
  FaTicketAlt,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaInfoCircle,
  FaFire
} from "react-icons/fa";

/**
 * Modern BilletDetail Component with Related Events
 * Shows similar events based on category
 */
const BilletDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [billet, setBillet] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fetch ticket details and related events
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await import("../data/billets.json");
        const allEvents = response.default;
        
        const foundBillet = allEvents.find((b) => b.id === parseInt(id));
        
        if (foundBillet) {
          setBillet(foundBillet);
          
          // Get related events (same category, exclude current event)
          const related = allEvents
            .filter(event => 
              event.category === foundBillet.category && 
              event.id !== foundBillet.id
            )
            .slice(0, 4); // Get max 4 related events
          
          setRelatedEvents(related);
          setError(null);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError("Error loading event");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Scroll to top when component mounts or ID changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(billet);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !billet) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaInfoCircle className="text-4xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Image & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Event Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={billet.image}
                alt={billet.name}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {billet.category}
                </span>
              </div>

              {/* Favorite & Share Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={toggleFavorite}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-white text-xl" />
                  )}
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaShare className="text-white text-xl" />
                </button>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  {billet.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {billet.description}
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Date Card */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Date</p>
                    <p className="font-bold text-gray-900">{formatFullDate(billet.date)}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <FaClock className="text-xs" />
                      {formatTime(billet.date)}
                    </p>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Location</p>
                    <p className="font-bold text-gray-900">{billet.location}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaTicketAlt className="text-2xl text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">E-Ticket</p>
                  <p className="font-bold text-gray-900 text-sm">Digital</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaUsers className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="font-bold text-gray-900 text-sm">Limited</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaStar className="text-2xl text-yellow-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="font-bold text-gray-900 text-sm">4.8/5</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaCheckCircle className="text-2xl text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-bold text-gray-900 text-sm">Available</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" />
                Event Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600 text-sm" />
                      Event admission ticket
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600 text-sm" />
                      Digital ticket delivery via email
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600 text-sm" />
                      Instant confirmation
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Cancellation Policy
                  </h3>
                  <p className="text-gray-600 ml-4">
                    Free cancellation up to 48 hours before the event. After that, tickets are non-refundable.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Important Information
                  </h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li>• Please arrive 30 minutes before the event starts</li>
                    <li>• Valid ID required for entry</li>
                    <li>• Present digital ticket at entrance</li>
                    <li>• Age restrictions may apply</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Contact & Support
                  </h3>
                  <p className="text-gray-600 ml-4">
                    For questions or support, contact us at:<br />
                    Email: support@events.com<br />
                    Phone: +1 (555) 123-4567<br />
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${billet.price}
                    </span>
                    <span className="text-gray-500">per ticket</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Number of Tickets
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors font-bold text-xl"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total</span>
                    <span className="text-2xl font-extrabold text-gray-900">
                      ${(billet.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
                >
                  <FaShoppingCart className="text-xl" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Instant ticket delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">Why Book With Us?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaTicketAlt />
                    </div>
                    <span>Over 10,000+ events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaUsers />
                    </div>
                    <span>500,000+ happy customers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaStar />
                    </div>
                    <span>4.8/5 average rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaFire className="text-orange-500" />
                  More {billet.category} Events
                </h2>
                <p className="text-gray-600">You might also be interested in these events</p>
              </div>
              <Link
                to="/events"
                className="hidden md:block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedEvents.map((event) => (
                <Link 
                  key={event.id} 
                  to={`/billet/${event.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {event.name}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt className="text-purple-600 text-xs" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaMapMarkerAlt className="text-purple-600 text-xs" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-500">From</p>
                          <p className="text-xl font-bold text-purple-600">${event.price}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(event);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center gap-2"
                        >
                          <FaShoppingCart className="text-xs" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button (Mobile) */}
            <div className="mt-8 text-center md:hidden">
              <Link
                to="/events"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BilletDetail;