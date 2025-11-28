export function getLocalAdvice(livePrice, history) {
  if (!livePrice || history.length < 2) {
    return "Not enough price data to generate advice right now.";
  }

  const last = history[history.length - 1].price;
  const prev = history[history.length - 2].price;

  const minPrice = Math.min(...history.map((h) => h.price));
  const maxPrice = Math.max(...history.map((h) => h.price));

  // CASE 1: New LOWEST price → BUY immediately
  if (livePrice <= minPrice) {
    return "🔥 This is the lowest price recorded recently. Great time to BUY now!";
  }

  // CASE 2: Price DROPPED compared to previous
  if (livePrice < prev) {
    return "📉 Price is dropping. Looks like a good time to BUY before it goes up again.";
  }

  // CASE 3: Price RISING
  if (livePrice > prev) {
    return "⏳ Price is increasing. Better to WAIT and check again in a few days.";
  }

  // CASE 4: Stable
  const diff = Math.abs(livePrice - prev);
  if (diff < 50) {
    return "🙂 Price is stable. Not the best deal, but safe to buy anytime.";
  }

  // Default
  return "ℹ️ No strong signals detected. Monitor price for a better deal.";
}
