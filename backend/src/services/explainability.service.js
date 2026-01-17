/**
 * Identify top carbon merchants and generate tips
 */
function generateExplainability(transactions) {
  const carbonKeywords = [
    "petrol",
    "fuel",
    "shell",
    "indian oil",
    "zara",
    "h&m",
    "airlines",
    "flight",
    "atm",
    "cash"
  ];

  const merchantSpend = {};
  let totalCarbonSpend = 0;

  transactions.forEach(txn => {
    if (txn.type !== "debit") return;

    const desc = txn.description.toLowerCase();
    const isCarbon = carbonKeywords.some(k => desc.includes(k));

    if (isCarbon) {
      merchantSpend[txn.description] =
        (merchantSpend[txn.description] || 0) + txn.amount;

      totalCarbonSpend += txn.amount;
    }
  });

  // Sort merchants by spend
  const topCarbonMerchants = Object.entries(merchantSpend)
    .map(([merchant, amount]) => ({ merchant, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Generate tips
  const tips = [];

  topCarbonMerchants.forEach(item => {
    const name = item.merchant.toLowerCase();

    if (name.includes("petrol") || name.includes("fuel")) {
      tips.push("Consider using public transport or carpooling to reduce fuel emissions.");
    } else if (name.includes("zara") || name.includes("h&m")) {
      tips.push("Reduce fast fashion purchases or try second-hand alternatives.");
    } else if (name.includes("air")) {
      tips.push("Limit air travel or choose direct flights to reduce carbon impact.");
    } else if (name.includes("atm") || name.includes("cash")) {
      tips.push("Reduce cash withdrawals and prefer digital payments.");
    }
  });

  return {
    topCarbonMerchants,
    totalCarbonSpend,
    tips: [...new Set(tips)] // remove duplicate tips
  };
}

module.exports = {
  generateExplainability
};
