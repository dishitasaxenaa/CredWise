require("dotenv").config();
const { analyzeTransactionsWithAI } = require("./src/services/ai.service");

// Mock transactions
const mockTransactions = [
  { description: "Starbucks", amount: 5.50, type: "debit" },
  { description: "Uber", amount: 15.00, type: "debit" },
  { description: "Whole Foods", amount: 120.00, type: "debit" }
];

async function test() {
  console.log("Testing Gemini API...");
  try {
    const result = await analyzeTransactionsWithAI(mockTransactions);
    console.log("Success! Result:", JSON.stringify(result, null, 2));
    
    // Check if it returned fallback data (which means it actually failed inside the service but was caught)
    if (result.neutral_percentage === 100 && result.green_percentage === 0) {
        console.log("WARNING: Result looks like fallback data. Check debug.log or validation.");
    }
  } catch (error) {
    console.error("Test Failed:", error);
    process.exit(1);
  }
}

test();
