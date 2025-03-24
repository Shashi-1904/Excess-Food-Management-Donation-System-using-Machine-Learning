const express = require("express");
const router = express.Router();
const { addInteraction } = require("../controllers/interaction-controller");
const authMiddleware = require("../middlewares/auth-middleware")

// POST route to add or update interaction
router.post("/add-interaction", authMiddleware, addInteraction);

module.exports = router;
