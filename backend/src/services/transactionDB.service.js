const Transaction = require("../models/Transaction");

async function getLastSixMonthsTransactions(accountNumber) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const fs = require("fs");
  fs.appendFileSync("debug.log", `QUERY: accountNumber=${accountNumber}, date>=${sixMonthsAgo}\n`);
  const transactions = await Transaction.find({
    accountNumber,
    date: { $gte: sixMonthsAgo }
  }).sort({ date: -1 });
  fs.appendFileSync("debug.log", `FOUND: ${transactions.length} transactions\n`);

  return transactions;
}

module.exports = {
  getLastSixMonthsTransactions
};
