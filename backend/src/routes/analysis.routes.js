const express = require("express");
const router = express.Router();
const { runAnalysis } = require("../controllers/analysis.controller");
const bankAuthMiddleware = require("../middlewares/bankAuth.middleware");

router.post("/run", bankAuthMiddleware, runAnalysis);

module.exports = router;
