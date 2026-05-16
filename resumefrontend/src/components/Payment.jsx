"use client";

import React, { useState } from "react";
import axios from "axios";
import useProfileStore from "../store/store";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const user = useProfileStore((state) => state.user);
  const setProfile = useProfileStore((state) => state.setProfile);

  // Load the Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (premiumtype) => {
    setLoading(true);

    // 1. Load Razorpay script
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 2. Create Order on Backend
      const { data: order } = await axios.post(
        "http://localhost:5001/api/payment/createOrder",
        { premiumtype },
        { withCredentials: true }
      );

      if (!order || !order.id) {
        alert("Server error. Please try again.");
        setLoading(false);
        return;
      }

      // 3. Setup Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure you add this to your frontend .env.local
        amount: order.amount,
        currency: order.currency,
        name: "ResumeToJob",
        description: `Upgrade to ${premiumtype.toUpperCase()} Account`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 4. Verify Payment on Backend
            const verifyRes = await axios.post(
              "http://localhost:5001/api/payment/verifyPayment",
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                premiumtype: premiumtype,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              alert("Payment Successful! Account Upgraded.");
              // Update user profile in Zustand
              setProfile({ ...user, acctype: premiumtype });
            } else {
              alert("Payment Verification Failed!");
            }
          } catch (err) {
            console.error(err);
            alert("Error verifying payment");
          }
        },
        prefill: {
          name: user?.name || "User",
          email: user?.email || "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 4. Open Razorpay Checkout Modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert("Payment Failed. Reason: " + response.error.description);
      });
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Error initiating payment");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upgrade Your Account</h2>
      <p className="text-gray-600 mb-8 text-center">
        Unlock premium features to enhance your profile and stand out to top recruiters.
      </p>

      <div className="w-full space-y-4">
        <button 
          onClick={() => handlePayment("pro")} 
          disabled={loading || user?.acctype === "pro" || user?.acctype === "pro-max"}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
            user?.acctype === "pro" || user?.acctype === "pro-max"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {loading ? "Processing..." : user?.acctype === "pro" || user?.acctype === "pro-max" ? "Already Upgraded" : "Upgrade to Pro (₹1.00)"}
        </button>
        
        <button 
          onClick={() => handlePayment("pro-max")} 
          disabled={loading || user?.acctype === "pro-max"}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
            user?.acctype === "pro-max"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {loading ? "Processing..." : user?.acctype === "pro-max" ? "Max Tier Active" : "Upgrade to Pro-Max (₹1.50)"}
        </button>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        Secure payments processed by Razorpay.
      </div>
    </div>
  );
}
