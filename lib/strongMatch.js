export function strongMatch(productName, scrapedName) {
  productName = productName.toLowerCase();
  scrapedName = scrapedName.toLowerCase();

  // extract important tokens
  const tokens = productName.split(/\s+/).filter(w =>
    !["smartwatch","bluetooth","wireless","calling","with","watch","model","series","edition","strap","mm"].includes(w)
  );

  // brand must match
  if (!scrapedName.includes(tokens[0])) return false;

  // require at least 2 words to match
  let hits = 0;
  for (const token of tokens.slice(1)) {
    if (scrapedName.includes(token)) hits++;
  }

  return hits >= 2; // require 2 matches beyond brand
}
