const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const validateAI = require("../utils/validateAI");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function analyzeTransactionsWithAI(transactions) {
  // Reduce payload size (VERY IMPORTANT)
  const simplifiedTxns = transactions.map(t => ({
    description: t.description,
    amount: t.amount,
    type: t.type
  }));

  // Load prompt
  const promptPath = path.join(__dirname, "../docs/prompt.txt");
  const basePrompt = fs.readFileSync(promptPath, "utf-8");

  const finalPrompt = `
${basePrompt}

Transactions:
${JSON.stringify(simplifiedTxns, null, 2)}
`;

  // Call Gemini
  try {
    fs.appendFileSync("debug.log", "Calling Gemini API...\\n");
    // Use the model initialized above
    const result = await model.generateContent(finalPrompt);
    fs.appendFileSync("debug.log", "Gemini response received.\\n");
    
    const response = await result.response;
    const text = response.text();
    fs.appendFileSync("debug.log", `Gemini Text: ${text.slice(0, 50)}...\\n`);
    
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let aiData;
    try {
      aiData = JSON.parse(cleanText);
    } catch (err) {
      console.error("❌ Gemini raw output:\\n", text);
      throw new Error("Gemini returned invalid JSON");
    }

    validateAI(aiData);
    return aiData;

  } catch (error) {
     fs.appendFileSync("debug.log", `Gemini ERROR: ${error.message}\\n`);
     console.error("Gemini API Failed, using fallback data:", error.message);
     // Return fallback data so dashboard doesn't crash
     return {
       green_percentage: 0,
       carbon_percentage: 0,
       neutral_percentage: 100
     };
  }
}

module.exports = {
  analyzeTransactionsWithAI
};
