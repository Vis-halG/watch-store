import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { strongMatch } from "@/lib/strongMatch";

export async function POST(req) {
  const { query, originalName } = await req.json();
  const url = `https://www.flipkart.com/search?q=${query.replace(/\s+/g,"+")}`;

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);
    const cards = $("._1AtVbE");

    for (let i = 0; i < cards.length; i++) {
      const card = cards.eq(i);
      const title = card.find(".IRpwTa, .s1Q9rs, .KzDlHZ").text().trim();

      if (strongMatch(originalName, title)) {
        const price = card.find("._30jeq3").text().trim() || "N/A";
        const link = card.find("a").attr("href");
        return NextResponse.json({
          store: "Flipkart",
          price,
          link: link ? `https://www.flipkart.com${link}` : "#"
        });
      }
    }

    return NextResponse.json({ store: "Flipkart", price: "N/A", link: "#" });

  } catch (err) {
    return NextResponse.json({ store: "Flipkart", price: "N/A", link: "#" });
  }
}
