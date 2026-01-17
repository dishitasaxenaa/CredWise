const express = require("express");
const router = express.Router();
const { getReward } = require("../controllers/reward.controller");

router.get("/", getReward);

module.exports = router;
