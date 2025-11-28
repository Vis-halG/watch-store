import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { product_id, product_name } = body;

    if (!product_id || !product_name) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🔍 1. Fetch Amazon live price (from your search API)
    const amzRes = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      body: JSON.stringify({ query: product_name })
    });

    const amz = await amzRes.json();
    const todayPrice = amz?.price ? Number(amz.price.replace(/[^0-9]/g, "")) : null;

    if (!todayPrice) {
      return Response.json({ history: [], price: null });
    }

    // 💾 2. Insert price into Supabase
    await supabase.from("price_history").insert({
      product_id,
      price: todayPrice
    });

    // 📊 3. Fetch full history for graph
    const { data: history } = await supabase
      .from("price_history")
      .select("date, price")
      .eq("product_id", product_id)
      .order("date", { ascending: true });

    return Response.json({
      price: todayPrice,
      history: history || []
    });

  } catch (err) {
    console.error("History Error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
