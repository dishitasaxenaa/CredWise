require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Testing gemini-2.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, { apiVersion: "v1" });

async function test() {
  console.log("Running AI test...");
  try {
    const mockTxns = [
        { description: "Starbucks", amount: 500, type: "debit" }
    ];
    // We need to replicate the logic from ai.service.js roughly or just test generation
    const result = await model.generateContent("Analyze this transaction: Starbucks $5.00");
    console.log("SUCCESS:", result.response.text());
  } catch (e) {
    console.error("FAILURE:", e.message);
  }
}

test();
