const bcrypt = require("bcryptjs");
const Bank = require("../models/Bank");
const BankAccount = require("../models/BankAccount");
require("../models/Customer"); // Register Customer model for populate

async function authenticateBankUser({ bankName, ifsc, accountNumber, pin }) {
  // 1. Find bank
  const bank = await Bank.findOne({ name: bankName });
  if (!bank) {
    throw new Error("Bank not found");
  }

  // 2. Find bank account
  const account = await BankAccount.findOne({
    accountNumber,
    ifsc,
    bank: bank._id
  }).populate("customer");

  if (!account) {
    throw new Error("Invalid account details");
  }

  // 3. Verify PIN
  const isPinValid = await bcrypt.compare(pin, account.pinHash);
  if (!isPinValid) {
    throw new Error("Invalid PIN");
  }

  return account;
}

module.exports = {
  authenticateBankUser
};
