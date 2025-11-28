"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price-asc");

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("watches")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data || []);
      else console.error(error);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    const q = search.trim().toLowerCase();

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest")
      list.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

    return list;
  }, [products, search, sort]);

  return (
    <div
      style={{
        padding: "16px",
        background: "#313647",
        minHeight: "100vh",
        color: "#FFF8D4",
        fontFamily: "sans-serif",
      }}
    >
      {/* 🔍 Search Box */}
      <input
        placeholder="Search watches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "14px",
          border: "1px solid rgba(255,248,212,0.2)",
          background: "#435663",
          color: "#FFF8D4",
          marginBottom: "12px",
          fontSize: "14px",
        }}
      />

      {/* ⚙ Sort Dropdown */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: "14px",
          border: "1px solid rgba(255,248,212,0.2)",
          background: "#435663",
          color: "#FFF8D4",
          marginBottom: "16px",
          fontSize: "14px",
          appearance: "none",
        }}
      >
        <option value="price-asc">Price • Low to High</option>
        <option value="price-desc">Price • High to Low</option>
        <option value="newest">Newest First</option>
      </select>

      {/* 🛒 Product Grid */}
      <ProductGrid products={filtered} />
    </div>
  );
}
