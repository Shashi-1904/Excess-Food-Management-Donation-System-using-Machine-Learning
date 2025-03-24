const express = require("express");
const router = express.Router();
const { exportAndSendLogs, sendToFlask } = require("../controllers/hotellog-controller");
const authMiddleware = require("../middlewares/auth-middleware")

router.get("/export-logs", authMiddleware, exportAndSendLogs);


router.get("/send-to-flask", authMiddleware, sendToFlask);

module.exports = router;
