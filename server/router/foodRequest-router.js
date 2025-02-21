const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const foodRequestForm = require("../controllers/foodRequest-controller");
const { foodRequestSchema } = require("../validators/auth-validator");
const { getAvailableDonations, requestDonation } = require("../controllers/donation-controller");
const authMiddleware = require("../middlewares/auth-middleware")

// Route for submitting a food request
router.route("/requestFood").post(validate(foodRequestSchema), foodRequestForm);
// Fetch all unassigned and undelivered donations
router.get("/available-donations", authMiddleware, getAvailableDonations);

// Request a donation by an NGO
router.post("/request-donation", authMiddleware, requestDonation);

module.exports = router;
