const express = require("express");

const { resetServive } = require("../utils/StatusReset");

const router = express.Router();

router.get("/reset", resetServive);

module.exports = router;
