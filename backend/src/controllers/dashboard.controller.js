const {
  getLastSixMonthsTransactions
} = require("../services/transactionDB.service");

const {
  analyzeTransactionsWithAI
} = require("../services/ai.service");

const {
  calculateGreenScore
} = require("../services/score.service");

const {
  calculateTrendBonus
} = require("../services/trend.service");

const {
  calculateInterestReward
} = require("../services/reward.service");

const {
  generateExplainability
} = require("../services/explainability.service");

const {
  calculateMonthlyCarbonTrend
} = require("../services/carbonTrend.service");
/**
 * Dashboard API
 * Returns score + reward + explainability in one response
 */
exports.getDashboard = async (req, res) => {
  try {
    const { accountNumber } = req.bankSession;

    // 1️⃣ Fetch last 6 months transactions
    const transactions =
      await getLastSixMonthsTransactions(accountNumber);

    if (!transactions.length) {
      return res.status(404).json({
        error: "No transactions found"
      });
    }

    // 2️⃣ AI analysis
    // 2️⃣ AI analysis
    const aiResult = await analyzeTransactionsWithAI(transactions);

    // 3️⃣ Withdrawal %
    let totalSpend = 0;
    let withdrawalSpend = 0;

    transactions.forEach(txn => {
      if (txn.type === "debit") {
        totalSpend += txn.amount;
        if (
          txn.description.toLowerCase().includes("atm") ||
          txn.description.toLowerCase().includes("cash")
        ) {
          withdrawalSpend += txn.amount;
        }
      }
    });

    const withdrawal_percentage =
      totalSpend === 0
        ? 0
        : Number(((withdrawalSpend / totalSpend) * 100).toFixed(2));

    // 4️⃣ Base Green Score
    const scoreResult = calculateGreenScore({
      green_percentage: aiResult.green_percentage,
      carbon_percentage: aiResult.carbon_percentage,
      withdrawal_percentage
    });

    // 5️⃣ Trend bonus
    const trendResult =
      await calculateTrendBonus(accountNumber, scoreResult.greenScore);

    let finalScore =
      scoreResult.greenScore + trendResult.bonus;

    finalScore = Math.max(300, Math.min(850, finalScore));

    // 6️⃣ Reward / interest logic
    const rewardData = calculateInterestReward(finalScore);
    const sign = rewardData.interestRateChange > 0 ? "+" : "";
    const interestRateImpact = `${sign}${rewardData.interestRateChange}% (${rewardData.label})`;

    // 7️⃣ Explainability
    const explanation =
      generateExplainability(transactions);

    const carbonTrend =
    calculateMonthlyCarbonTrend(transactions);

    // 8️⃣ Final dashboard response
    res.json({
      account: `XXXXXX${accountNumber.slice(-4)}`,
      score: {
        baseScore: scoreResult.greenScore,
        finalScore,
        grade: scoreResult.grade
      },
      trend: trendResult,
      rewards: {
        interestRateImpact
      },
      analysis: {
        green_percentage: aiResult.green_percentage,
        carbon_percentage: aiResult.carbon_percentage,
        neutral_percentage: aiResult.neutral_percentage,
        withdrawal_percentage
      },
      explainability: explanation,
      carbonTrend
    });

  } catch (error) {
    console.error("❌ Dashboard Error:", error.message);
    res.status(500).json({
      error: "Failed to load dashboard"
    });
  }
};
