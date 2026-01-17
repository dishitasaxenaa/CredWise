function calculateInterestReward(greenScore) {
  let interestRateChange = 0;
  let label = "Neutral";
  let message = "";

  if (greenScore >= 750) {
    interestRateChange = -0.75;
    label = "Excellent";
    message =
      "Excellent sustainability behavior 🌱 You qualify for maximum interest reduction.";
  } else if (greenScore >= 650) {
    interestRateChange = -0.25;
    label = "Good";
    message =
      "Good sustainability habits 👍 You qualify for a reduced interest rate.";
  } else if (greenScore >= 500) {
    interestRateChange = 0;
    label = "Average";
    message =
      "Average sustainability score. Improve green spending to unlock benefits.";
  } else {
    interestRateChange = +0.5;
    label = "Poor";
    message =
      "High carbon spending detected ⚠️ Loan interest rate may increase.";
  }

  return {
    interestRateChange,
    label,
    message
  };
}

module.exports = {
  calculateInterestReward
};
