const {
  getLastSixMonthsTransactions
} = require("../services/transactionDB.service");

const {
  generateExplainability
} = require("../services/explainability.service");

/**
 * Explain why the user's score is low or high
 */
exports.getExplainability = async (req, res) => {
  try {
    const { accountNumber } = req.bankSession;

    const transactions =
      await getLastSixMonthsTransactions(accountNumber);

    if (!transactions.length) {
      return res.status(404).json({
        error: "No transactions found"
      });
    }

    const explanation =
      generateExplainability(transactions);

    res.json({
      account: `XXXXXX${accountNumber.slice(-4)}`,
      explanation
    });
  } catch (error) {
    console.error("❌ Explainability Error:", error.message);
    res.status(500).json({
      error: "Failed to generate explanation"
    });
  }
};
