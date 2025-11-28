export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { product, livePrice, history } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const last3 =
      history && history.length > 0
        ? history
            .slice(-3)
            .map((h) => `₹${h.price} (${h.date})`)
            .join(", ")
        : "No price history";

    const prompt = `
Give a short BUY or WAIT recommendation.

Product: ${product}
Current Price: ₹${livePrice}
Recent Price History: ${last3}

Write only 3 short lines.
    `;

    const result = await model.generateContent(prompt);
    return Response.json({ advice: result.response.text() });
  } catch (err) {
    console.error("AI ERROR:", err);
    return Response.json({ advice: "AI advice not available right now." });
  }
}
