"use client";

import { useCart } from "./CartContext";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link
      href={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "#435663",
          borderRadius: "18px",
          padding: "12px",
          height: "250px",                 // ⭐ FIXED CARD HEIGHT
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          transition: "transform .15s ease, box-shadow .15s ease",
        }}
      >
        {/* IMAGE WRAPPER */}
        <div
          style={{
            width: "100%",
            height: "130px",
            borderRadius: "12px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* PRODUCT NAME */}
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            marginTop: "8px",
            color: "#FFF8D4",
            height: "32px",                 // ⭐ FIX NAME BLOCK HEIGHT
            overflow: "hidden",
            lineHeight: "1.2",
          }}
        >
          {product.name}
        </div>

        {/* BRAND */}
        <div
          style={{
            fontSize: "11px",
            marginTop: "2px",
            color: "rgba(255,248,212,0.6)",
          }}
        >
          {product.brand}
        </div>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#A3B087",
            }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            style={{
              background: "#A3B087",
              color: "#313647",
              border: "none",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform .15s ease, background .2s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.9)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </Link>
  );
}
