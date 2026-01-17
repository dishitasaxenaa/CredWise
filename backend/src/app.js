const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/bank", require("./routes/bank.routes"));
app.use("/analysis", require("./routes/analysis.routes"));
app.use("/score", require("./routes/score.route"));
app.use("/user", require("./routes/user.routes"));
app.use("/reward", require("./routes/reward.routes"));
app.use("/explainability", require("./routes/explainability.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

module.exports = app;
