import { getLocalAdvice } from "@/lib/adviceEngine";

export async function POST(req) {
  try {
    const body = await req.json();
    const { livePrice, history, ourPrice } = body;

    const advice = getLocalAdvice(livePrice, history, ourPrice);

    return Response.json({ advice });
  } catch (err) {
    console.error("Advice API error:", err);
    return Response.json({ advice: "Unable to generate advice right now." });
  }
}
