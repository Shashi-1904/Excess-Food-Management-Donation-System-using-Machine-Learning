const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const foodRequestForm = require("../controllers/foodRequest-controller");
const { foodRequestSchema } = require("../validators/auth-validator");

// Route for submitting a food request
router.route("/requestFood").post(validate(foodRequestSchema), foodRequestForm);

module.exports = router;
