const GreenScore = require("../models/GreenScore");

async function saveGreenScore({
  accountNumber,
  score,
  grade,
  breakdown
}) {
  const record = await GreenScore.create({
    accountNumber,
    score,
    grade,
    breakdown
  });

  return record;
}

async function getScoreHistory(accountNumber) {
  return GreenScore.find({ accountNumber })
    .sort({ createdAt: -1 });
}

module.exports = {
  saveGreenScore,
  getScoreHistory
};
