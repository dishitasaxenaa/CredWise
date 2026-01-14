const express = require("express");
const router = express.Router();
const { runAnalysis } = require("../controllers/analysis.controller");

router.post("/run", runAnalysis);

module.exports = router;
