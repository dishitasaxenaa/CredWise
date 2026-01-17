require("dotenv").config();
const mongoose = require("mongoose");
const Transaction = require("./src/models/Transaction");

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  const account = "12345678901";
  const count = await Transaction.countDocuments({ accountNumber: account });
  console.log(`Transactions for ${account}: ${count}`);

  if (count > 0) {
      const recent = await Transaction.find({ accountNumber: account }).sort({date: -1}).limit(1);
      console.log("Most recent:", recent[0]);
  }

  const allCount = await Transaction.countDocuments({});
  console.log(`Total transactions in DB: ${allCount}`);

  process.exit();
}

checkDB();
