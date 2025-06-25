import React, { useRef } from "react";

const OrderReceipt = ({ order }) => {
  const printRef = useRef();

  const handlePrint = () => {
    // Affiche la boîte d'impression navigateur
    window.print();
  };

  return (
    <>
      <div ref={printRef} id="printable-area" className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Reçu de Commande #{order.id}</h1>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Client:</strong> {order.customer?.fullName || "Inconnu"}</p>
        <p><strong>Email:</strong> {order.customer?.email || "Inconnu"}</p>
        <p ><strong>Téléphone:</strong> {order.customer?.phone || "Inconnu"}</p>
        <p><strong>Adresse:</strong> {order.customer?.address || "Inconnue"}</p>

        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Produit</th>
              <th className="border border-gray-300 p-2 text-right">Quantité</th>
              <th className="border border-gray-300 p-2 text-right">Prix Unitaire</th>
              <th className="border border-gray-300 p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2 text-right">{item.quantity}</td>
                <td className="border border-gray-300 p-2 text-right">{item.price.toLocaleString()} GNF</td>
                <td className="border border-gray-300 p-2 text-right">{(item.price * item.quantity).toLocaleString()} GNF</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right font-bold mt-4 text-lg">
          Total: {order.total.toLocaleString()} GNF
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Imprimer le reçu
        </button>
      </div>

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
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default OrderReceipt;
