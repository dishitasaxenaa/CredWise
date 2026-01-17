const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboard.controller");
const bankAuthMiddleware = require("../middlewares/bankAuth.middleware");

router.get("/", bankAuthMiddleware, getDashboard);

module.exports = router;
