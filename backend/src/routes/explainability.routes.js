const express = require("express");
const router = express.Router();
const { getExplainability } = require("../controllers/explainability.controller");
const bankAuthMiddleware = require("../middlewares/bankAuth.middleware");

router.get("/", bankAuthMiddleware, getExplainability);

module.exports = router;
