const express = require("express");
const { getHotelDonations, postHotelLogs } = require("../controllers/hotel-controller");
const authMiddleware = require("../middlewares/auth-middleware")

const router = express.Router();

// Get donation history for a hotel
router.get("/history", authMiddleware, getHotelDonations);
router.post("/add-log", authMiddleware, postHotelLogs);

module.exports = router;
