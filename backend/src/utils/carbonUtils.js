const carbonKeywords = [
  "petrol",
  "fuel",
  "shell",
  "indian oil",
  "zara",
  "h&m",
  "air",
  "flight",
  "airlines",
  "atm",
  "cash"
];

function isCarbonTransaction(description) {
  const desc = description.toLowerCase();
  return carbonKeywords.some(k => desc.includes(k));
}

module.exports = {
  isCarbonTransaction
};
