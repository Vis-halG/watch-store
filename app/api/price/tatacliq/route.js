import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { query } = await req.json();
  const search = query.replace(/\s+/g, "+");
  const url = `https://www.tatacliq.com/search/?searchKey=${search}`;

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(data);
    const card = $(".productGridItem").first(); // example selector
    const price = card.find(".finalPrice").text().trim() || "N/A";
    const link = card.find("a").attr("href");
    return NextResponse.json({
      store: "Tata CLiQ",
      price: price,
      link: link ? `https://www.tatacliq.com${link}` : "#"
    });
  } catch (e) {
    console.error("Tata CLiQ scrape error:", e.message);
    return NextResponse.json({ store: "Tata CLiQ", price: "N/A", link: "#" });
  }
}
