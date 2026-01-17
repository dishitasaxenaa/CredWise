const {
  calculateInterestReward
} = require("../services/reward.service");

/**
 * Get interest rate adjustment based on Green Score
 */
exports.getReward = (req, res) => {
  try {
    const { greenScore } = req.query;

    if (!greenScore) {
      return res.status(400).json({
        error: "greenScore is required"
      });
    }

    const reward =
      calculateInterestReward(Number(greenScore));

    res.json({
      greenScore: Number(greenScore),
      reward
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to calculate reward"
    });
  }
};
