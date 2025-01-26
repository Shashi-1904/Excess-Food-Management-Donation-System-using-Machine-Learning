const express = require("express");
const router = express.Router();
const { getAllUsers, getAllDonations, getVolunteerEmails, assignDonation, getAllRequests } = require("../controllers/admin-controller");
const isAdmin = require("../middlewares/isAdmin"); // Middleware to check admin role
const authMiddleware = require("../middlewares/auth-middleware")


router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/donations", authMiddleware, isAdmin, getAllDonations);
router.get("/requests", authMiddleware, isAdmin, getAllRequests);
router.get('/emails', authMiddleware, isAdmin, getVolunteerEmails);
router.post("/assign-donation", authMiddleware, isAdmin, assignDonation);

module.exports = router;
