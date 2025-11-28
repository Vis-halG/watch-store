export async function getSmartSearchQuery(productName) {
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a search query generator for INDIAN e-commerce (Amazon.in, Flipkart, Croma).
User's product name: "${productName}"

Task:
- Return the BEST short search query (3–6 words) that will find this exact product.
- Focus on brand + model/main name.
- Do NOT include size like 40mm / 45mm.
- Do NOT include words like Bluetooth, Smartwatch, Wireless, GPS, Calling.
- Output ONLY the query string, nothing else.
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await resp.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || productName;

    // Ensure it's a single line
    return text.split("\n")[0].trim();
  } catch (err) {
    console.error("Gemini search query error:", err);
    return productName;
  }
}
