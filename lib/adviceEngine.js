export function getLocalAdvice(amazonPrice, history = [], ourPrice) {
  if (!amazonPrice || amazonPrice <= 0) {
    return "Live price is not available right now. Please try again.";
  }

  // Lowest price ever
  const previousLowest = history.length
    ? Math.min(...history.map((h) => h.price))
    : null;

  const lastPrice = history.length ? history[history.length - 1].price : null;

  let msg = "";

  // ⚡ Compare OUR price vs Amazon
  if (ourPrice < amazonPrice) {
    msg += "🔥 Our store is cheaper than Amazon! ";
  } else if (ourPrice > amazonPrice) {
    msg += "🛍 Amazon is cheaper right now. ";
  } else {
    msg += "🤝 Prices are almost the same on both stores. ";
  }

  // 📉 Compare Amazon price with history
  if (previousLowest !== null && amazonPrice < previousLowest) {
    msg += "This is the lowest price so far — good time to buy.";
  } else if (lastPrice && amazonPrice < lastPrice) {
    msg += "Price dropped recently — nice deal.";
  } else if (lastPrice && amazonPrice > lastPrice) {
    msg += "Price went up a bit — you can wait if not urgent.";
  } else {
    msg += "No big price changes recently.";
  }

  return msg.trim();
}
