"use client";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { getLocalAdvice } from "@/lib/adviceEngine";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [amazonPrice, setAmazonPrice] = useState(null);
  const [history, setHistory] = useState([]);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  // 👉 Fetch product details
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("watches")
        .select("*")
        .eq("id", id)
        .single();
      setProduct(data);
    }
    load();
  }, [id]);

  // 👉 Fetch price / Save history / Load history / Local AI
  useEffect(() => {
    if (!product?.name) return;

    async function fetchAll() {
      setLoading(true);

      // 1) Fetch Amazon Live Price
      const amz = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: product.name }),
      });

      const amzData = await amz.json();
      setAmazonPrice(amzData);

      // Extract numeric price
      const todayPrice = amzData?.price
        ? Number(amzData.price.replace(/[^0-9]/g, ""))
        : null;

      // 2) Save today's price to Supabase
      if (todayPrice) {
        await supabase.from("price_history").insert({
          product_id: product.id,
          price: todayPrice,
        });
      }

      // 3) Fetch full history
      const { data: histData } = await supabase
        .from("price_history")
        .select("date, price")
        .eq("product_id", product.id)
        .order("date", { ascending: true });

      setHistory(histData || []);

      // 4) Local Price-Based Advice (NO API needed)
      const localAdvice = getLocalAdvice(
  todayPrice,        // Amazon live price
  histData || [],    // full price history
  product.price      // ⭐ your website price
);

      setAdvice(localAdvice);

      setLoading(false);
    }

    fetchAll();
  }, [product]);

  // Loading UI
  if (!product) {
    return (
      <div
        style={{
          background: "#313647",
          minHeight: "100vh",
          color: "#FFF8D4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading product…
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#313647",
        minHeight: "100vh",
        color: "#FFF8D4",
        padding: 18,
        fontFamily: "sans-serif",
      }}
    >
      {/* PRODUCT IMAGE */}
      <img
        src={product.image_url}
        alt={product.name}
        style={{
          width: "100%",
          borderRadius: 16,
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
        }}
      />

      {/* PRODUCT INFO */}
      <h2 style={{ marginTop: 18, fontSize: 24, fontWeight: 700 }}>
        {product.name}
      </h2>

      <p style={{ color: "rgba(255,248,212,0.75)" }}>{product.brand}</p>

      <h3
        style={{
          fontSize: 22,
          marginTop: 6,
          color: "#A3B087",
          fontWeight: 700,
        }}
      >
        ₹{product.price.toLocaleString("en-IN")}
      </h3>

      <hr style={{ margin: "20px 0", borderColor: "#435663" }} />

      {/* AMAZON PRICE */}
      <h3 style={{ fontSize: 18, color: "#A3B087" }}>
        🛍 Best Offer (Amazon)
      </h3>

      {loading && (
        <p style={{ marginTop: 10, color: "rgba(255,248,212,0.7)" }}>
          Checking Amazon price…
        </p>
      )}

      {!loading && amazonPrice && (
        <div
          style={{
            background: "#435663",
            padding: 14,
            borderRadius: 12,
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #A3B087",
          }}
        >
          <strong style={{ color: "#FFF8D4" }}>Amazon</strong>

          <span style={{ color: "#A3B087", fontWeight: 700 }}>
            {amazonPrice?.price || "N/A"}
          </span>

          <a
            href={amazonPrice?.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FFF8D4", fontSize: 13 }}
          >
            Buy Now ↗
          </a>
        </div>
      )}

      {/* PRICE HISTORY GRAPH */}
      {history.length > 0 && (
        <div
          style={{
            marginTop: 30,
            background: "#435663",
            padding: 14,
            borderRadius: 12,
          }}
        >
          <h3 style={{ color: "#A3B087", marginBottom: 10 }}>
            📉 Price Trend (Amazon)
          </h3>

          <Line
            data={{
              labels: history.map((h) => h.date),
              datasets: [
                {
                  label: "Price (₹)",
                  data: history.map((h) => h.price),
                  borderColor: "#A3B087",
                  backgroundColor: "rgba(163,176,135,0.2)",
                  borderWidth: 2,
                  tension: 0.4,
                },
              ],
            }}
            height={200}
          />
        </div>
      )}

      {/* SMART BUY ADVICE */}
      {advice && (
        <div
          style={{
            background: "#435663",
            padding: 16,
            marginTop: 24,
            borderRadius: 12,
            border: "1px solid #A3B087",
          }}
        >
          <strong style={{ color: "#A3B087", fontSize: 16 }}>
            🤖 Smart Buy Advice
          </strong>

          <p style={{ marginTop: 8, color: "#FFF8D4", lineHeight: 1.5 }}>
            {advice}
          </p>
        </div>
      )}
    </div>
  );
}
