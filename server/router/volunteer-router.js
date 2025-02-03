const express = require('express');
const router = express.Router();
const { getAssignedDonations, updateDonationStatus, getMatchingRequests, updateRequestStatus } = require('../controllers/volunteer-controller');
const authMiddleware = require("../middlewares/auth-middleware")

router.get('/assigned-donations', authMiddleware, getAssignedDonations);
router.put('/update-donation-status', authMiddleware, updateDonationStatus);
router.put('/update-request-status', authMiddleware, updateRequestStatus);
router.get('/matching-requests', authMiddleware, getMatchingRequests);


module.exports = router;
