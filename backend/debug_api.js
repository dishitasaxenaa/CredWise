const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testVersions() {
  const modelName = "gemini-1.5-flash"; // Should exist
  
  console.log(`Testing ${modelName} with DIFFERENT API VERSIONS...`);

  const versions = ["v1beta", "v1"];

  for (const v of versions) {
      console.log(`\nTesting version: ${v}`);
      try {
          // getGenerativeModel(params, requestOptions)
          // requestOptions: { apiVersion?: string, ... }
          const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: v });
          const result = await model.generateContent("Hello");
          console.log(`✅ SUCCESS with ${v}!`);
          console.log(result.response.text());
          return;
      } catch (e) {
          console.log(`❌ FAILED with ${v}: ${e.message}`);
      }
  }
}

testVersions();
