const express = require("express");
const router = express.Router();
const { getAllUsers, getAllDonations, getVolunteerEmails } = require("../controllers/admin-controller");
const isAdmin = require("../middlewares/isAdmin"); // Middleware to check admin role
const authMiddleware = require("../middlewares/auth-middleware")


router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/donations", authMiddleware, isAdmin, getAllDonations);
router.get('/emails', authMiddleware, isAdmin, getVolunteerEmails);

module.exports = router;
