require("dotenv").config();
const { analyzeTransactionsWithAI } = require("./src/services/ai.service");

const mockTransactions = [
    { description: "Shell Petrol Pump", amount: 3000 },
    { description: "Delhi Metro Recharge", amount: 600 },
    { description: "ZARA Store", amount: 4500 }
];

async function testAI() {
    console.log("Testing AI Service...");
    try {
        const result = await analyzeTransactionsWithAI(mockTransactions);
        console.log("AI Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        const fs = require('fs');
        const logMsg = `AI Service Validation Failed:\nMessage: ${error.message}\nStack: ${error.stack}\nResponse: ${error.response ? JSON.stringify(error.response, null, 2) : 'N/A'}\n`;
        fs.writeFileSync('reproduce_log.txt', logMsg);
        console.error(logMsg);
    }
}

testAI();
