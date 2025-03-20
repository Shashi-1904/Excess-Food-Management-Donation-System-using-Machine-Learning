const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const upload = multer({
    dest: "uploads/",
});

exports.uploadDataset = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const fileStream = req.file.path;
        const formData = new FormData();
        formData.append("file", fs.createReadStream(fileStream));

        // Send the file to the Flask backend
        const response = await axios.post('http://127.0.0.1:5000/train_and_predict_2', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        fs.unlinkSync(fileStream);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "File upload failed." });
    }
};



exports.sendDatasetToFlask = async (req, res) => {
    try {
        const filePath = "uploads/food_demand_dataset.csv";

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Dataset file not found." });
        }

        // Create form data with the dataset
        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));

        // Send the file to the Flask backend
        const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Return Flask's response to the client
        return res.status(200).json(response.data);

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Failed to send dataset to Flask." });
    }
};

exports.uploadMiddleware = upload.single("file");
