const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-1.0-pro",
    "gemini-pro"
];

async function testModels() {
    console.log("Starting Model Check...");
    for (const modelName of models) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log(`SUCCESS!`);
            console.log(`WORKING_MODEL:${modelName}`);
            process.exit(0);
        } catch (e) {
console.error(`FAILED: ${modelName}`, e);
        }
    }
    console.log("ALL_FAILED");
}

testModels();
