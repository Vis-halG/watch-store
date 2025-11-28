"use client";

import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false); // ⭐ Popup state

  const pay = () => {
    if (!name || !phone || !addr || !pincode || !city) {
      setErr("Please fill all fields");
      return;
    }

    // 1) SHOW POPUP
    setSuccess(true);

    // 2) Clear cart (after showing popup)
    clearCart();

    // 3) Redirect after 2 sec
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div
      style={{
        background: "#313647",
        minHeight: "100vh",
        padding: "18px",
        color: "#FFF8D4",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* 🎉 FULL-SCREEN SUCCESS POPUP */}
      {success && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              background: "#A3B087",
              padding: "28px 32px",
              borderRadius: "20px",
              textAlign: "center",
              color: "#313647",
              fontWeight: "700",
              fontSize: "22px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
            }}
          >
            ✔ Payment Successful!
            <p style={{ fontSize: "14px", marginTop: "6px" }}>
              Redirecting…
            </p>
          </div>
        </div>
      )}

      {/* ❌ REMOVE THIS → No more cart empty blocking UI */}

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
        Checkout
      </h2>

      {/* ADDRESS FORM */}
      <div
        style={{
          background: "#435663",
          padding: "18px",
          borderRadius: "16px",
          marginBottom: 20,
          border: "1px solid rgba(255,248,212,0.15)",
        }}
      >
        <h3
          style={{
            fontSize: 16,
            color: "#A3B087",
            marginBottom: 14,
            fontWeight: "600",
          }}
        >
          📦 Delivery Address
        </h3>

        {/* Name */}
        <label style={{ fontSize: 13 }}>Full Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          style={inputStyle}
        />

        {/* Phone */}
        <label style={{ fontSize: 13, marginTop: 10 }}>Phone Number</label>
        <input
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9876543210"
          style={inputStyle}
        />

        {/* Address */}
        <label style={{ fontSize: 13, marginTop: 10 }}>Address</label>
        <textarea
          rows="3"
          onChange={(e) => setAddr(e.target.value)}
          placeholder="Flat / House No, Street Name"
          style={{
            ...inputStyle,
            height: "70px",
            resize: "none",
          }}
        ></textarea>

        {/* Pincode */}
        <label style={{ fontSize: 13, marginTop: 10 }}>Pincode</label>
        <input
          type="number"
          onChange={(e) => setPincode(e.target.value)}
          placeholder="400001"
          style={inputStyle}
        />

        {/* City */}
        <label style={{ fontSize: 13, marginTop: 10 }}>City</label>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Mumbai"
          style={inputStyle}
        />
      </div>

      {/* ORDER SUMMARY */}
      <div
        style={{
          background: "#435663",
          padding: "16px",
          borderRadius: "16px",
          marginBottom: 20,
        }}
      >
        <h3 style={{ color: "#A3B087", fontSize: 16, marginBottom: 10 }}>
          🧾 Order Summary
        </h3>

        {cart.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,248,212,0.15)",
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
            }}
          >
            <span>{item.name.slice(0, 20)}...</span>
            <strong>₹{item.price}</strong>
          </div>
        ))}

        <p style={{ marginTop: 12, fontSize: 15 }}>
          Total:{" "}
          <strong style={{ color: "#A3B087" }}>
            ₹{totalPrice.toLocaleString("en-IN")}
          </strong>
        </p>
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={pay}
        style={{
          width: "100%",
          background: "#A3B087",
          padding: "14px",
          borderRadius: "14px",
          fontSize: 16,
          fontWeight: "700",
          color: "#313647",
          border: "none",
          cursor: "pointer",
        }}
      >
        Pay Now (Demo)
      </button>

      <p style={{ marginTop: 14, textAlign: "center" }}>
        <Link href="/cart" style={{ color: "#FFF8D4", fontSize: 13 }}>
          ← Back to cart
        </Link>
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginTop: "6px",
  background: "#313647",
  borderRadius: "12px",
  border: "1px solid rgba(255,248,212,0.2)",
  fontSize: 14,
  color: "#FFF8D4",
};
