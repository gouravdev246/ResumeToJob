"use client";

import React, { useState } from "react";
import axios from "axios";
import useProfileStore from "../store/store";
import { Check, Sparkles, ShieldCheck, Zap, Loader2 } from "lucide-react";

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
          color: "#4f46e5",
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

  const isPro = user?.acctype === "pro";
  const isProMax = user?.acctype === "pro-max";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center items-center">
      
      {/* Title & Description */}
      <div className="max-w-3xl text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Upgrade Your Account
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Unlock the full power of AI-driven resume optimization, real-time job compatibility scoring, and premium templates.
        </p>
      </div>

      {/* Grid of Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full items-stretch px-4">
        
        {/* Pro Plan Card */}
        <div className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-indigo-200 flex flex-col justify-between relative group ${
          isPro ? "ring-2 ring-indigo-500" : ""
        }`}>
          {isPro && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Your Current Plan
            </span>
          )}
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">Pro Plan</h3>
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Zap className="w-5 h-5" />
              </span>
            </div>
            
            <p className="text-slate-500 text-sm font-medium mb-6">
              Supercharge your job application process with core AI features.
            </p>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-slate-950">₹1.00</span>
              <span className="text-slate-400 text-sm font-medium">/ lifetime</span>
            </div>

            {/* Features list */}
            <ul className="space-y-4 mb-8">
              {[
                "Basic resume parsing",
                "Job compatibility scoring",
                "Up to 5 resume scans per day",
                "Standard downloadable PDF",
                "Basic keyword suggestions"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => handlePayment("pro")}
            disabled={loading || isPro || isProMax}
            className={`w-full py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isPro || isProMax
                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : isPro ? (
              "Active Plan"
            ) : isProMax ? (
              "Included in Pro-Max"
            ) : (
              "Upgrade to Pro"
            )}
          </button>
        </div>

        {/* Pro-Max Plan Card */}
        <div className={`bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] flex flex-col justify-between relative group md:scale-105 ${
          isProMax ? "ring-2 ring-purple-500" : ""
        }`}>
          
          {/* Best Value Badge */}
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            {isProMax ? "Your Active Plan" : "Best Value"}
          </span>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Pro-Max Plan</h3>
              <span className="p-2 bg-slate-800 text-purple-400 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </span>
            </div>
            
            <p className="text-slate-400 text-sm font-medium mb-6">
              Ultimate career acceleration tools with deep AI fitment analytics.
            </p>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">₹1.50</span>
              <span className="text-slate-500 text-sm font-medium">/ lifetime</span>
            </div>

            {/* Features list */}
            <ul className="space-y-4 mb-8">
              {[
                "Everything in Pro",
                "Advanced AI resume optimization advisor",
                "Unlimited resume scans & uploads",
                "Premium tailored resume templates",
                "Priority fitment match insights",
                "Direct job applications tracker",
                "Priority customer support"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => handlePayment("pro-max")}
            disabled={loading || isProMax}
            className={`w-full py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isProMax
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg active:scale-98 cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : isProMax ? (
              "Active Plan"
            ) : (
              "Upgrade to Pro-Max"
            )}
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-16 flex items-center gap-2 bg-slate-200/50 backdrop-blur-sm border border-slate-200/60 py-2.5 px-5 rounded-2xl shadow-sm text-xs font-semibold text-slate-500 select-none">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Secure lifetime upgrades processed by Razorpay. Cancel anytime.</span>
      </div>

    </div>
  );
}
