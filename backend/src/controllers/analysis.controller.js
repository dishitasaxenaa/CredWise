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
  saveGreenScore
} = require("../services/greenScore.service");

const {
  calculateTrendBonus
} = require("../services/trend.service");

const {
  calculateStreaks,
  assignBadges
} = require("../services/gamification.service");

/**
 * Calculate cash withdrawal percentage (deterministic)
 */
function calculateWithdrawalPercentage(transactions) {
  let totalSpend = 0;
  let withdrawalSpend = 0;

  transactions.forEach(txn => {
    if (txn.type === "debit") {
      totalSpend += txn.amount;

      const desc = txn.description.toLowerCase();
      if (desc.includes("atm") || desc.includes("cash")) {
        withdrawalSpend += txn.amount;
      }
    }
  });

  if (totalSpend === 0) return 0;

  return Number(((withdrawalSpend / totalSpend) * 100).toFixed(2));
}

/**
 * Run full sustainability analysis
 */
exports.runAnalysis = async (req, res) => {
  try {
    const { accountNumber } = req.bankSession;

    // 1️⃣ Fetch last 6 months transactions
    const fs = require("fs");
    fs.appendFileSync("debug.log", `Analyzing for account: ${accountNumber}\n`);
    const transactions =
      await getLastSixMonthsTransactions(accountNumber);
     fs.appendFileSync("debug.log", `Result: ${transactions.length}\n`);

    if (!transactions.length) {
      return res.status(404).json({
        error: "No transactions found for last 6 months"
      });
    }

    // 2️⃣ AI analysis
    const aiResult =
      await analyzeTransactionsWithAI(transactions);

    // 3️⃣ Withdrawal %
    const withdrawal_percentage =
      calculateWithdrawalPercentage(transactions);

    // 4️⃣ Base Green Score
    const scoreResult = calculateGreenScore({
      green_percentage: aiResult.green_percentage,
      carbon_percentage: aiResult.carbon_percentage,
      withdrawal_percentage
    });

    // 5️⃣ Gamification (Streaks & Badges)
    // Use analyzed transactions from AI result if available, otherwise fallback to raw transactions
    // AI result should ideally map categories back to transactions
    // For now, we use the raw transactions but enhanced if possible. 
    // Since AI returns aggregate percentages, we'll pass the raw transactions to gamification
    // but we need to know which are "green" or "high carbon".
    // Improving gamification service to detect keys in description was done.
    
    // Determine streak and badges based on raw transactions + AI insights if possible
    // For now, we rely on the robust heuristics added to gamification.service.js
    const streak = calculateStreaks(transactions);
    const badges = assignBadges(transactions);
    const consistencyBonus = streak * 10;

    // Apply consistency bonus to score
    let finalBaseScore = scoreResult.greenScore + consistencyBonus;

    // 6️⃣ Save base score history
    await saveGreenScore({
      accountNumber,
      score: finalBaseScore,
      grade: scoreResult.grade, // You might want to recalculate grade if bonus pushes it up, but simpler to keep base grade
      breakdown: scoreResult.breakdown
    });

    // 7️⃣ Trend bonus / penalty
    const trendResult =
      await calculateTrendBonus(accountNumber, finalBaseScore);

    let finalScore =
      finalBaseScore + trendResult.bonus;

    finalScore = Math.max(300, Math.min(850, finalScore));

    // Determine Interest Impact correctly
    let interestImpact = "+0.5%";
    if (finalScore >= 800) interestImpact = "-1.00% (Platinum)";
    else if (finalScore >= 700) interestImpact = "-0.50% (Gold)";
    else if (finalScore >= 600) interestImpact = "-0.25% (Silver)";
    else if (finalScore >= 500) interestImpact = "Neutral (Standard)";
    else interestImpact = "+0.50% (Risk Premium)";

    // Tips Generation
    const tips = [];
    if (aiResult.carbon_percentage > 30) tips.push(`Reduce High Carbon spend (currently ${aiResult.carbon_percentage}%) to improve score.`);
    if (withdrawal_percentage > 20) tips.push("Avoid cash withdrawals to track improvements better.");
    if (aiResult.green_percentage < 10) tips.push("Switch to sustainable brands to boost your Green Score.");
    if (streak > 0) tips.push(`Great job! You are on a ${streak}-month Green Streak!`);


    // 8️⃣ Final response
    res.json({
      account: `XXXXXX${accountNumber.slice(-4)}`,
      transactionCount: transactions.length,
      analysis: {
        green_percentage: aiResult.green_percentage,
        carbon_percentage: aiResult.carbon_percentage,
        neutral_percentage: aiResult.neutral_percentage,
        withdrawal_percentage
      },
      score: {
        baseScore: finalBaseScore,
        finalScore,
        grade: scoreResult.grade,
        breakdown: scoreResult.breakdown
      },
      gamification: {
        streak,
        badges
      },
      rewards: {
        interestRateImpact: interestImpact
      },
      trend: trendResult,
      tips,
      explainability: {
        // We can pass top transactions from AI result if needed, explicitly returned by AI service
        // For now, sending a placeholder or if AI service returns them
        analyzedTransactions: transactions.slice(0, 5) // Send top 5 recent as sample
      }
    });

  } catch (error) {
    console.error("❌ Analysis Error:", error.message);
    const fs = require("fs");
    fs.appendFileSync("debug.log", `ERROR: ${error.message}\n`);
    res.status(500).json({
      error: "Failed to analyze transactions"
    });
  }
};
