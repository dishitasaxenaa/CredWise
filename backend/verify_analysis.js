const jwt = require("jsonwebtoken");
const http = require("http");

// Configuration
const SECRET = "credwise_secret_key";
const PORT = 5000;
const ACCOUNT = "12345678901";

// Generate Token
const token = jwt.sign(
  { accountNumber: ACCOUNT, bank: "State Bank of India" },
  SECRET,
  { expiresIn: "1h" }
);

console.log("Token generated:", token);

// Request Options
const data = JSON.stringify({});
const options = {
  hostname: "localhost",
  port: PORT,
  path: "/analysis/run",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Content-Length": data.length
  }
};

// Make Request
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      console.log("RESPONSE:");
      console.log(JSON.stringify(parsed, null, 2));

      // Verification checks
      if (parsed.gamification) {
        console.log("\n✅ Gamification data present");
      } else {
        console.error("\n❌ Gamification data MISSING");
      }
      
      if (parsed.score) {
          console.log("✅ Score present");
      } else {
          console.error("❌ Score MISSING");
      }
      
    } catch (e) {
      console.error("Failed to parse response:", body);
    }
  });
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(data);
req.end();
