const express = require("express");
const { updateProfile } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validate = require("../middlewares/validate-middleware");
const { updateProfileSchema } = require("../validators/auth-validator");

const router = express.Router();

// Route for updating user profile
router.put("/updateprofile", authMiddleware, validate(updateProfileSchema), updateProfile);

module.exports = router;










