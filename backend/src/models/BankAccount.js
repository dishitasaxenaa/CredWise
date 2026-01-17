const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true
    },
    ifsc: {
      type: String,
      required: true
    },
    pinHash: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      default: 0
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankAccount", bankAccountSchema);
