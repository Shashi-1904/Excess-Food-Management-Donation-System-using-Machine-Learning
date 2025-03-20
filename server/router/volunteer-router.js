const express = require('express');
const router = express.Router();
const { getAssignedDonations, updateDonationStatus, getMatchingRequests, updateRequestStatus } = require('../controllers/volunteer-controller');
const authMiddleware = require("../middlewares/auth-middleware")
const { assignVolunteer } = require("../controllers/volunteer-assignement-controller");

router.get('/assigned-donations', authMiddleware, getAssignedDonations);
router.put('/update-donation-status', authMiddleware, updateDonationStatus);
router.put('/update-request-status', authMiddleware, updateRequestStatus);
router.get('/matching-requests', authMiddleware, getMatchingRequests);
router.post("/assign-volunteer", assignVolunteer);

module.exports = router;









