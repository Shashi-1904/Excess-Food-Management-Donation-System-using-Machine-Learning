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
        const response = await axios.post('http://127.0.0.1:5000/train_and_predict', formData, {
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


exports.uploadMiddleware = upload.single("file");
