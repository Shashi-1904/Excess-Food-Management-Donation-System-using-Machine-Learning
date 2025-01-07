const express = require("express");
const { uploadDataset, uploadMiddleware } = require("../controllers/uploadController");
const router = express.Router();

router.post("/response", uploadMiddleware, uploadDataset);

module.exports = router;
