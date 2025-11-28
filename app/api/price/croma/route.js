import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { query } = await req.json();
  const search = query.replace(/\s+/g, "%20");
  const url = `https://www.croma.com/search/?text=${search}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);
    const first = $(".product-item").first();

    const price = first.find(".pdpPrice").first().text().trim();
    const link = first.find("a").attr("href");

    return NextResponse.json({
      store: "Croma",
      price: price || "N/A",
      link: link ? `https://www.croma.com${link}` : "#",
    });
  } catch (e) {
    console.error("Croma error:", e.message);
    return NextResponse.json({ store: "Croma", price: "N/A", link: "#" });
  }
}
