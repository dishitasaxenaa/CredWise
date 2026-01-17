require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  console.log("Listing models...");
  try {
    // We cannot list models directly via helper in older SDKs easily without init.
    // But let's try assuming standard method exists or fallback to direct fetch.
    // Actually, newer SDK has no direct 'listModels' on genAI instance usually, 
    // it's often on a specific manager or we just try a known working one.
    // Let's try to use the raw API via fetch if SDK fails.
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    const responseV1 = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`);
    const dataV1 = await responseV1.json();

    const fs = require("fs");
    fs.writeFileSync("models.json", JSON.stringify({ v1beta: data, v1: dataV1 }, null, 2));
    console.log("Written to models.json");

  } catch (e) {
    console.error("Error listing models:", e.message);
  }
}

listModels();
