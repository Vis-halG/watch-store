import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { query } = await req.json();
  const search = query.replace(/\s+/g, "+");
  const url = `https://www.amazon.in/s?k=${search}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);
    const first = $(".s-result-item[data-component-type='s-search-result']").first();

    const priceWhole = $(first).find(".a-price-whole").first().text().trim();
    const priceFrac = $(first).find(".a-price-fraction").first().text().trim();
    const link = $(first).find("a.a-link-normal.s-no-outline").attr("href");

    return NextResponse.json({
      store: "Amazon",
      price: priceWhole ? `₹${priceWhole}${priceFrac}` : "N/A",
      link: link ? `https://www.amazon.in${link}` : "#",
    });
  } catch (e) {
    console.error("Amazon error:", e.message);
    return NextResponse.json({ store: "Amazon", price: "N/A", link: "#" });
  }
}
