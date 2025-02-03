const express = require("express");
const router = express.Router();
const { getAllUsers, getAllDonations, getVolunteerEmails, assignDonation, getAllRequests, replyToMessage, getAllContacts, deleteUser } = require("../controllers/admin-controller");
const isAdmin = require("../middlewares/isAdmin");
const authMiddleware = require("../middlewares/auth-middleware")


router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/donations", authMiddleware, isAdmin, getAllDonations);
router.get("/requests", authMiddleware, isAdmin, getAllRequests);
router.get('/emails', authMiddleware, isAdmin, getVolunteerEmails);
router.post("/assign-donation", authMiddleware, isAdmin, assignDonation);
router.post("/reply", authMiddleware, isAdmin, replyToMessage);
router.get("/contacts", authMiddleware, isAdmin, getAllContacts);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;








