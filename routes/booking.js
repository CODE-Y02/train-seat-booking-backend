const express = require("express");
const { bookSeats } = require("../controllers/booking");

const router = express.Router();

// booking --> post --> user info + no of seat

router.post("/book", bookSeats);

module.exports = router;
