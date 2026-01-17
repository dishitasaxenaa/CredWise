require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Bank = require("../models/Bank");
const Customer = require("../models/Customer");
const BankAccount = require("../models/BankAccount");
const Transaction = require("../models/Transaction");

// --------------------
// Helper functions
// --------------------
const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const TRANSACTION_TEMPLATES = [
  { desc: "Shell Petrol Pump", min: 500, max: 4000, type: "debit" },
  { desc: "Indian Oil Petrol Pump", min: 500, max: 4000, type: "debit" },
  { desc: "Delhi Metro Recharge", min: 100, max: 800, type: "debit" },
  { desc: "BMTC Bus Pass", min: 100, max: 500, type: "debit" },
  { desc: "ZARA Store", min: 2000, max: 8000, type: "debit" },
  { desc: "H&M Store", min: 1500, max: 7000, type: "debit" },
  { desc: "EV Charging Station", min: 300, max: 1500, type: "debit" },
  { desc: "Amazon Supermarket", min: 500, max: 6000, type: "debit" },
  { desc: "Electricity Bill", min: 800, max: 3000, type: "debit" },
  { desc: "Water Bill", min: 300, max: 1200, type: "debit" },
  { desc: "ATM Cash Withdrawal", min: 1000, max: 10000, type: "debit" },
  { desc: "IndiGo Airlines", min: 4000, max: 15000, type: "debit" },
  { desc: "Salary Credit", min: 30000, max: 80000, type: "credit" }
];

// --------------------
// Main seed function
// --------------------
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing existing data...");
    await Bank.deleteMany();
    await Customer.deleteMany();
    await BankAccount.deleteMany();
    await Transaction.deleteMany();

    console.log("🏦 Creating bank...");
    const bank = await Bank.create({
      name: "State Bank of India",
      ifscPrefix: "SBIN"
    });

    console.log("👤 Creating customers and accounts...");
    const accounts = [];

    for (let i = 1; i <= 10; i++) {
      const customer = await Customer.create({
        name: `Customer ${i}`,
        phone: `90000000${i}`,
        email: `customer${i}@mail.com`
      });

      const pinHash = await bcrypt.hash("1234", 10);

      const account = await BankAccount.create({
        accountNumber: `1234567890${i}`,
        ifsc: `SBIN00012${i}`,
        pinHash,
        balance: randomBetween(50000, 300000),
        customer: customer._id,
        bank: bank._id
      });

      accounts.push(account);
    }

    console.log("💳 Creating transactions...");
    const transactions = [];

    accounts.forEach(account => {
      const txnCount = randomBetween(80, 120);

      for (let i = 0; i < txnCount; i++) {
        const t =
          TRANSACTION_TEMPLATES[
            Math.floor(Math.random() * TRANSACTION_TEMPLATES.length)
          ];

        transactions.push({
          accountNumber: account.accountNumber,
          description: t.desc,
          amount: randomBetween(t.min, t.max),
          type: t.type,
          date: new Date(
            Date.now() - randomBetween(0, 180) * 24 * 60 * 60 * 1000
          )
        });
      }
    });

    await Transaction.insertMany(transactions);

    console.log("✅ Database seeded successfully!");
    console.log("🔑 Test PIN for all accounts: 1234");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
