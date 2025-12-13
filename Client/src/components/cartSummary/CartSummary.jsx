import "./CartSummary.css";

import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

function CartSummary() {
  const { cartItems } = useContext(AppContext);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-light mb-0">Total Amount</h5>
            <h5 className="text-warning mb-0 fw-bold">₹{totalAmount.toFixed(2)}</h5>
        </div>
        <button className="btn btn-primary w-100 fw-bold py-2">
            Pay Now
        </button>
    </div>
  )
}

export default CartSummary;
