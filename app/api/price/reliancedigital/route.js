import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { query } = await req.json();
  const search = query.replace(/\s+/g, "+");
  const url = `https://www.reliancedigital.in/search?q=${search}`;

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(data);
    const card = $(".grid-product__details").first(); // example selector
    const price = card.find(".price").text().trim() || "N/A";
    const link = card.find("a").attr("href");
    return NextResponse.json({
      store: "Reliance Digital",
      price: price,
      link: link ? `https://www.reliancedigital.in${link}` : "#"
    });
  } catch (e) {
    console.error("Reliance Digital scrape error:", e.message);
    return NextResponse.json({ store: "Reliance Digital", price: "N/A", link: "#" });
  }
}
