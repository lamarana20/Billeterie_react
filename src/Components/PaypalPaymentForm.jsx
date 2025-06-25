import React from 'react';

const PaypalPaymentForm = ({ paypalEmail, onChange }) => {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded border space-y-2">
      <label className="block text-sm">Email PayPal*</label>
      <input
        type="email"
        name="paypalEmail"
        value={paypalEmail}
        onChange={onChange}
        className="w-full p-2 border rounded"
        placeholder="adresse@paypal.com"
        required
      />
    </div>
  );
};

export default PaypalPaymentForm;
