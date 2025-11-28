import * as cheerio from "cheerio";

export async function POST(req) {
  const { query } = await req.json();

  try {
    const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-IN,en;q=0.9",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    let product = null;

    // 🔍 Choose the first product that contains part of the product name
    $("div[data-component-type='s-search-result']").each((i, el) => {
      const title = $(el).find("h2 a span").text().trim().toLowerCase();
      if (title.includes(query.toLowerCase())) {
        product = $(el);
        return false; // stop loop
      }
    });

    // If no close match found, fallback to first result
    if (!product) {
      product = $("div[data-component-type='s-search-result']").first();
    }

    // 🏷️ Extract title
    const title =
      product.find("h2 a span").text().trim() || query;

    // 💰 Extract price (with fallback)
    const priceWhole = product.find(".a-price-whole").first().text().trim();
    const priceFraction = product.find(".a-price-fraction").first().text().trim();
    const rawPrice = priceWhole
      ? priceWhole.replace(/[,₹]/g, "") + "." + (priceFraction || "00")
      : null;

    const price = rawPrice ? `₹${rawPrice}` : "N/A";

    // 🔗 Extract link
    const link =
      "https://www.amazon.in" + product.find("a").attr("href");

    return Response.json({
      store: "Amazon",
      title,
      price,
      link,
    });
  } catch (err) {
    console.error("Amazon Scrape Error:", err);

    return Response.json({
      store: "Amazon",
      price: "N/A",
      link: "#",
    });
  }
}
