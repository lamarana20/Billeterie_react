import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { OrderService } from "../services/orderService";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await OrderService.getOrderById(Number(id));
        setOrder(orderData);
      } catch (error) {
        console.error(error);
        toast.error("Commande introuvable");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Annuler cette commande ?")) return;
    
    setCancelling(true);
    try {
      await OrderService.cancelOrder(Number(id));
      setOrder(prev => ({ ...prev, status: "cancelled" }));
      toast.success("Commande annulée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'annulation", error.message || "Veuillez réessayer plus tard");
    } finally {
      setCancelling(false);
    }
  };
  // Fonction pour envoyer le reçu par email
    const handleSendEmail = () => {
    // Simule l'envoi par email (à connecter avec backend Laravel si besoin)
    toast.success(`Reçu envoyé à ${order.customer.email}`);
  };

  const handleSendWhatsApp = () => {
    const message = encodeURIComponent(
      `🧾 Reçu de commande\n\nCommande #${order.id}\nTotal: ${order.total.toLocaleString()} GNF\nClient: ${order.customer.fullName}\nTéléphone: ${order.customer.phone}\nMerci pour votre achat !`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };
   const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <p>Chargement de votre commande...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <p>Commande introuvable</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Zone imprimable */}
      <div id="printable-area" className="bg-white p-6 rounded-lg shadow-md">
        <div className={`p-3 mb-4 rounded ${
          order.status === "confirmed" ? "bg-green-100 text-green-800" :
          order.status === "cancelled" ? "bg-red-100 text-red-800" :
          "bg-blue-100 text-blue-800"
        }`}>
          <h1 className="text-2xl font-bold">
            Commande #{order.id} - {
              order.status === "confirmed" ? "Confirmée" :
              order.status === "cancelled" ? "Annulée" :
              "En traitement"
            }
          </h1>
          <p className="text-sm mt-1">
            Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR')} à {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Détails de la commande */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Détails de la commande</h2>
            <ul className="divide-y">
              {order.items.map(item => (
                <li key={item.id} className="py-3 flex">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded mr-3"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × {item.price.toLocaleString()} GNF
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t pt-3 font-bold text-right">
              Total: {order.total.toLocaleString()} GNF
            </div>
          </div>

          {/* Informations client */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Informations client</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Nom:</span> {order.customer.fullName}</p>
              <p><span className="font-medium">Email:</span> {order.customer.email}</p>
              <p><span className="font-medium">Téléphone:</span> {order.customer.phone}</p>
              <p><span className="font-medium">Adresse:</span> {order.customer.address}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Paiement</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Méthode:</span> {
                  order.payment.method === "mobile_money" ? "Mobile Money" : 
                  order.payment.method === "cash" ? "Paiement à la livraison" : 
                  order.payment.method
                }
              </p>
              <p>
                <span className="font-medium">Statut:</span> {
                  order.payment.status === "pending" ? "En attente" :
                  order.payment.status === "paid" ? "Payé" :
                  "Non payé"
                }
              </p>
              {order.payment.transactionId && (
                <p><span className="font-medium">Référence:</span> {order.payment.transactionId}</p>
              )}
            </div>
          </div>
        </div>

        {order.status === "cancelled" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800">Cette commande a été annulée.</p>
          </div>
        )}
      </div>

      {/* Boutons */}
    <div className="mt-6 pt-4 border-t flex flex-wrap gap-3 justify-between">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Retour à l'accueil
        </Link>

        {order.status !== "cancelled" && (
          <button
            onClick={handleCancelOrder}
            disabled={cancelling}
            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${
              cancelling ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {cancelling ? "Annulation en cours..." : "Annuler la commande"}
          </button>
        )}

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Imprimer le reçu
        </button>

        <button
          onClick={handleSendEmail}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center gap-2"
        >
          <MdEmail className="text-lg" />
          Envoyer par email
        </button>

        <button
          onClick={handleSendWhatsApp}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FaWhatsapp className="text-lg" />
          Envoyer par WhatsApp
        </button>
      </div>

      {/* Style pour l'impression */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
          a {
            text-decoration: none !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
