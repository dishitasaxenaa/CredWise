require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
console.log(process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;

// Connect to Database first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 CredWise backend running on port ${PORT}`);
  });
});
