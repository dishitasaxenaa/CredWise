const calculateScore = require("../services/score.service");
const { calculateInterestAdjustment } = require("../services/reward.service");

exports.getScore = (req, res) => {
  const { green, carbon } = req.query;

  const scoreResult = calculateScore({ green, carbon });
  const reward = calculateInterestAdjustment(scoreResult.greenScore);

  res.json({
    ...scoreResult,
    reward
  });
};
