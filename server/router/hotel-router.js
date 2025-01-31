const express = require("express");
const { getHotelDonations } = require("../controllers/hotel-controller");
const authMiddleware = require("../middlewares/auth-middleware") // Middleware for authentication

const router = express.Router();

// Get donation history for a hotel
router.get("/history", authMiddleware, getHotelDonations);

module.exports = router;
