const express = require("express");
const { uploadDataset, uploadMiddleware, sendDatasetToFlask } = require("../controllers/uploadController");
const router = express.Router();

router.post("/response", uploadMiddleware, uploadDataset);
router.get("/send-dataset", sendDatasetToFlask);


module.exports = router;
