const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware")

// register route
router.route("/register").post(validate(signupSchema), authcontrollers.register);

//login route
router.route("/login").post(validate(loginSchema), authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;


