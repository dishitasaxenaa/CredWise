const { getTransactions } = require("../services/transaction.service");
const { calculateAnalysis } = require("../services/analysis.service");

exports.runAnalysis = async (req, res) => {
  try {
    // 1. Get Transactions (Mocked for now, mimicking Bank API)
    // In future, req.body could contain bank details to fetch specific user data
    const transactions = getTransactions("1234567890");

    // Filter to last 30 days for analysis to prevent huge aggregated totals
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentTransactions = transactions.filter(t => new Date(t.date) >= thirtyDaysAgo);

    // 2. Perform Analysis
    const analysisResult = await calculateAnalysis(recentTransactions);

    res.json({
      success: true,
      data: {
        transactions: transactions.slice(0, 50), // Send recent history
        analysis: analysisResult
      }
    });
  } catch (err) {
    console.error("Analysis Error:", err);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
};
