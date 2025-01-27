// routes/volunteerRouter.js
const express = require('express');
const router = express.Router();
const { getAssignedDonations, updateDonationStatus, getMatchingRequests } = require('../controllers/volunteer-controller');
const authMiddleware = require("../middlewares/auth-middleware")
// Route to get all donations assigned to the logged-in volunteer
router.get('/assigned-donations', authMiddleware, getAssignedDonations);

// Route to update the status of a donation (when a volunteer completes or processes it)
router.put('/update-donation-status', authMiddleware, updateDonationStatus);
router.put('/update-donation-status', authMiddleware, updateDonationStatus);
router.get('/matching-requests', authMiddleware, getMatchingRequests);


module.exports = router;
