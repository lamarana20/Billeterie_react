import React, { useState, useContext } from "react";
import { CartContext } from "../Context/Shop-card-context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderService } from "../services/orderService";
import { AuthContext } from "../Components/AuthContext";
import CardPaymentForm from "./CardPaymentForm";
import PaypalPaymentForm from "./PaypalPaymentForm";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "mobile_money",
    termsAccepted: false
  });

  const [cardData, setCardData] = useState({});
  const [paypalEmail, setPaypalEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast.error("Veuillez accepter les conditions générales");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total,
        userId: user?.id,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        payment: {
          method: formData.paymentMethod,
          status: "pending",
          ...(formData.paymentMethod === "card" && {
            card: cardData
          }),
          ...(formData.paymentMethod === "paypal" && {
            paypalEmail
          })
        }
      };

      const createdOrder = await OrderService.createOrder(orderData);

      toast.success(`Commande #${createdOrder.id} confirmée !`);
      clearCart();
      navigate(`/order-confirmation/${createdOrder.id}`);
    } catch (error) {
      console.error("Erreur de commande:", error);
      toast.error("Une erreur est survenue lors de la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Finaliser la commande</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informations client */}
          <div>
            <label className="block mb-1">Nom complet*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Téléphone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Adresse*</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          {/* Méthode de paiement */}
          <div>
            <label className="block mb-1">Méthode de paiement*</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="mobile_money">Mobile Money</option>
              <option value="cash">Paiement à la livraison</option>
              <option value="card">Carte bancaire</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Affichage dynamique du formulaire selon méthode */}
          {formData.paymentMethod === "card" && (
            <CardPaymentForm
              cardData={cardData}
              onChange={(e) =>
                setCardData({ ...cardData, [e.target.name]: e.target.value })
              }
            />
          )}

          {formData.paymentMethod === "paypal" && (
            <PaypalPaymentForm
              paypalEmail={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
            />
          )}

          {["mobile_money", "cash"].includes(formData.paymentMethod) && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
              {formData.paymentMethod === "mobile_money"
                ? "Vous recevrez une demande de paiement sur le numéro fourni."
                : "Vous paierez directement à la livraison."}
            </div>
          )}

          {/* Conditions générales */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              id="termsCheckbox"
              required
            />
            <label htmlFor="termsCheckbox" className="text-sm">
              J'accepte les conditions générales de vente*
            </label>
          </div>

          {/* Récapitulatif du panier */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-2">Votre commande</h3>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>{(item.price * item.quantity).toLocaleString()} GNF</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-2 font-bold text-right">
              Total: {total.toLocaleString()} GNF
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
