const mongoose = require("mongoose");

const greenScoreSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      index: true
    },
    score: {
      type: Number,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    breakdown: {
      green_percentage: Number,
      carbon_percentage: Number,
      withdrawal_percentage: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GreenScore", greenScoreSchema);
