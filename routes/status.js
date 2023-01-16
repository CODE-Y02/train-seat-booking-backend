const express = require("express");
const {
  totalVacentSeats,
  bookedRowsAndSeats,
} = require("../controllers/status");

const router = express.Router();

// status --> get --> rows + col

router.get("/bookingStatus", bookedRowsAndSeats);
router.get("", totalVacentSeats);

module.exports = router;
