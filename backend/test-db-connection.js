require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("Testing connection to:", uri.replace(/:([^:@]+)@/, ":****@")); // Hide password in logs

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error);
    process.exit(1);
  }
};

connectDB();
