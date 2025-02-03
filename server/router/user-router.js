const express = require("express");
const { updateProfile, getUserContactHistory } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validate = require("../middlewares/validate-middleware");
const { updateProfileSchema } = require("../validators/auth-validator");

const router = express.Router();

// Route for updating user profile
router.put("/updateprofile", authMiddleware, validate(updateProfileSchema), updateProfile);
router.get("/contact-history", authMiddleware, getUserContactHistory);


module.exports = router;










