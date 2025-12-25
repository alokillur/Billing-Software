/* eslint-disable no-unused-vars */
import "./CartSummary.css";

import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { deleteOrder } from "../../service/OrderService";
import toast from "react-hot-toast";
import { useState } from "react";
import { createOrder } from "../../service/OrderService";
import { createRazorpayOrder } from "../../service/PaymentService";
import { AppConstants } from "../../utils/constants";
import { verifyPayment } from "../../service/PaymentService";
import ReceiptPopup from "../receiptPopup/ReceiptPopup";

function CartSummary({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.18;
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer name and mobile number");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Please add items to cart");
      return;
    }

    const order = {
      customerName: customerName,
      phoneNumber: mobileNumber,
      subTotal: totalAmount,
      tax: tax,
      grandTotal: grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
      cartItems,
    };

    setIsProcessing(true);
    try {
      const response = await createOrder(order);
      const savedData = { ...order, ...response.data };
      
      if (response.status === 201 && paymentMode === "CASH") {
        toast.success("Cash Received");
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === "ONLINE_PAYMENT") {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          toast.error("Razorpay failed to load");
          deleteOrderOnFailure(savedData.orderId);
          return;
        }

        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          name: "Billing Software - V1.0",
          description: "Order Payment",
          order_id: razorpayResponse.data.id,

          handler: async function (response) {
            await verifyPaymentHandler(response, savedData);
          },

          prefill: {
            name: customerName,
            contact: mobileNumber,
          },

          theme: {
            color: "#3399cc",
          },

          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment Cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment failed", async (response) => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment Failed");
          console.error(response.error.description);
        });
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (razorpayResponse, savedData) => {
    const paymentData = {
      razorpayOrderId: razorpayResponse.razorpay_order_id,
      razorpayPaymentId: razorpayResponse.razorpay_payment_id,
      razorpaySignature: razorpayResponse.razorpay_signature,
      orderId: savedData.orderId,
    };

    try {
      const verificationResponse = await verifyPayment(paymentData);
      if (verificationResponse.status === 200) {
        toast.success("Payment Successful");
        setOrderDetails({
          ...savedData,
          razorpayOrderId: paymentData.razorpayOrderId,
          razorpayPaymentId: paymentData.razorpayPaymentId,
        });
      } else {
        toast.error("Payment Processing Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item: </span>
          <span className="text-light">₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax (18%): </span>
          <span className="text-light">₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span className="text-light">Grand Total: </span>
          <span className="text-light">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => completePayment("CASH")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          className="btn btn-primary flex-grow-1"
          onClick={() => completePayment("ONLINE_PAYMENT")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Online payment"}
        </button>
      </div>

      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-warning flex-grow-1"
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
      {showPopup && (
        <ReceiptPopup
          orderDetails={orderDetails}
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
}

export default CartSummary;
