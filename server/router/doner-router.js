const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const donateFoodForm = require("../controllers/doner-controller")
const { foodDonationSchema } = require("../validators/auth-validator");


router.route("/donateFood").post(validate(foodDonationSchema), donateFoodForm);


module.exports = router;
