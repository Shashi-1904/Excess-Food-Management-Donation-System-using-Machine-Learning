const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

// Configure multer to handle file uploads
const upload = multer({
    dest: "uploads/", // Temporary location
});

exports.uploadDataset = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // Path to the uploaded file
        const fileStream = req.file.path;

        // Create a FormData instance
        const formData = new FormData();
        formData.append("file", fs.createReadStream(fileStream)); // Add file to FormData

        // Send the file to the Flask backend
        const response = await axios.post('http://127.0.0.1:5000/train_and_predict', formData, {
            headers: {
                ...formData.getHeaders(), // Include FormData-specific headers
            },
        });

        // Clean up the temporary file
        fs.unlinkSync(fileStream);

        // Return the Flask backend's response to the client
        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "File upload failed." });
    }
};

// Middleware for handling file uploads
exports.uploadMiddleware = upload.single("file");
