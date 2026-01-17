const { isCarbonTransaction } = require("../utils/carbonUtils");

/**
 * Calculate month-over-month carbon spend
 */
function calculateMonthlyCarbonTrend(transactions) {
  const now = new Date();

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  let thisMonthCarbon = 0;
  let lastMonthCarbon = 0;

  transactions.forEach(txn => {
    if (txn.type !== "debit") return;
    if (!isCarbonTransaction(txn.description)) return;

    const date = new Date(txn.date);

    if (date >= thisMonthStart) {
      thisMonthCarbon += txn.amount;
    } else if (date >= lastMonthStart && date <= lastMonthEnd) {
      lastMonthCarbon += txn.amount;
    }
  });

  let changePercent = 0;
  if (lastMonthCarbon > 0) {
    changePercent =
      ((thisMonthCarbon - lastMonthCarbon) / lastMonthCarbon) * 100;
  }

  return {
    thisMonthCarbon: Math.round(thisMonthCarbon),
    lastMonthCarbon: Math.round(lastMonthCarbon),
    changePercent: Number(changePercent.toFixed(2))
  };
}

module.exports = {
  calculateMonthlyCarbonTrend
};
