const GreenScore = require("../models/GreenScore");

/**
 * Calculate trend-based bonus or penalty
 */
async function calculateTrendBonus(accountNumber, currentScore) {
  // Fetch last two score records
  const history = await GreenScore.find({ accountNumber })
    .sort({ createdAt: -1 })
    .limit(2);

  // If no previous data → no trend bonus
  if (history.length < 2) {
    return {
      bonus: 0,
      reason: "No previous score available for trend analysis"
    };
  }

  const previousScore = history[1].score;
  const delta = currentScore - previousScore;

  let bonus = 0;
  let reason = "No significant change in behavior";

  if (delta >= 30) {
    bonus = 20;
    reason = "Strong improvement in sustainable spending this month";
  } else if (delta >= 15) {
    bonus = 10;
    reason = "Moderate improvement in sustainable spending";
  } else if (delta <= -30) {
    bonus = -20;
    reason = "Significant increase in carbon-heavy spending";
  } else if (delta <= -15) {
    bonus = -10;
    reason = "Moderate increase in carbon-heavy spending";
  }

  return {
    bonus,
    reason,
    previousScore,
    delta
  };
}

module.exports = {
  calculateTrendBonus
};
