import React from 'react';

const CardPaymentForm = ({ cardData, onChange }) => {
  return (
    <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded border">
      <div>
        <label className="block text-sm">Numéro de carte*</label>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber || ""}
          onChange={onChange}
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm">Date d’expiration*</label>
          <input
            type="text"
            name="cardExpiry"
            value={cardData.cardExpiry || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            placeholder="MM/AA"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm">CVV*</label>
          <input
            type="text"
            name="cardCvv"
            value={cardData.cardCvv || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            placeholder="123"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
