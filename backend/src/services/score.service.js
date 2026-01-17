// // src/services/score.service.js

// const BASE_SCORE = 500;

// function calculateScore({ green_percentage, carbon_percentage, withdrawal_percentage, consistency_bonus = 0 }) {
//   const green = Number(green_percentage || 0);
//   const carbon = Number(carbon_percentage || 0);
//   const withdrawal = Number(withdrawal_percentage || 0);

//   // Weighted Formula
//   // +2.5 for every 1% of Green Spend
//   // -2.0 for every 1% of High Carbon Spend
//   // -1.0 for every 1% of Cash Withdrawal
//   let scoreChange = (green * 2.5) - (carbon * 2) - (withdrawal * 1);

//   // Add Consistency Bonus
//   scoreChange += consistency_bonus;

//   let finalScore = BASE_SCORE + scoreChange;

//   // Cap the score between 300 and 900
//   finalScore = Math.max(300, Math.min(900, Math.round(finalScore)));

//   return {
//     score: finalScore,
//     breakdown: {
//       base: BASE_SCORE,
//       greenImpact: Math.round(green * 2.5),
//       carbonImpact: Math.round(carbon * -2),
//       withdrawalImpact: Math.round(withdrawal * -1),
//       bonus: consistency_bonus
//     }
//   };
// }

// module.exports = { calculateScore };
function calculateGreenScore({
  green_percentage,
  carbon_percentage,
  withdrawal_percentage
}) {
  const BASE_SCORE = 600;

  const scoreChange =
    (green_percentage * 2.5) -
    (carbon_percentage * 2.0) -
    (withdrawal_percentage * 1.0);

  let score = BASE_SCORE + scoreChange;

  // Clamp between 300 and 850
  score = Math.max(300, Math.min(850, Math.round(score)));

  let grade = "Average";
  if (score >= 750) grade = "Excellent";
  else if (score >= 650) grade = "Good";
  else if (score >= 500) grade = "Average";
  else grade = "Poor";

  return {
    greenScore: score,
    grade,
    breakdown: {
      green_percentage,
      carbon_percentage,
      withdrawal_percentage
    }
  };
}

module.exports = {
  calculateGreenScore
};

