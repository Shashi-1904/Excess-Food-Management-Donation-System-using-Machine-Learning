const HotelLog = require("../models/hotel-log-schema");
const fs = require("fs");
const { Parser } = require("json2csv");
const axios = require("axios");
const Interaction = require("../models/interaction-schema");

const FLASK_URL = "http://127.0.0.1:5000/analyze-logs";

// Extract logs
exports.exportAndSendLogs = async (req, res) => {
    try {
        const hotelEmail = req.user.email;

        // Fetch hotel logs
        const hotel = await HotelLog.findOne({ hotelEmail });

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const logs = hotel.dailyLogs;

        if (logs.length <= 1000) {
            return res.status(400).json({ message: "Insufficient logs (< 1000 entries)" });
        }

        // Create CSV file
        const fields = [
            "date", "dishName", "quantityPrepared", "dayOfWeek", "month", "weekend",
            "festivalName", "festivalType", "daysBeforeAfterFestival",
            "totalCustomers", "ordersPerDish", "weather", "specialOffer",
            "quantityWasted", "holiday", "event", "deliveryOrders"
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(logs);

        const filePath = `./exports/${hotelEmail}_logs.csv`;
        fs.writeFileSync(filePath, csv);

        // Send CSV to Flask
        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));

        const flaskResponse = await axios.post(FLASK_URL, formData, {
            headers: { ...formData.getHeaders() }
        });

        // Delete the CSV after sending
        fs.unlinkSync(filePath);

        res.status(200).json({
            message: "Logs exported and analyzed successfully",
            result: flaskResponse.data
        });

    } catch (error) {
        console.error("Error exporting logs:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



exports.sendToFlask = async (req, res) => {
    try {
        // Count the total number of interaction documents
        const interactionCount = await Interaction.countDocuments();

        // Only send data if sufficient records are available
        if (interactionCount < 100) {
            return res.status(400).json({ message: "Not enough data to send" });
        }

        // Fetch all interactions from the database
        const interactions = await Interaction.find().lean();

        // Convert the data into CSV format
        const csvData = interactions.map(i =>
            `${i.volunteerEmail},${i.locationId},${i.interactionScore},${i.timestamp.toISOString()}`
        ).join("\n");

        // Send the CSV data to Flask
        const response = await axios.post("http://127.0.0.1:5000/recommend", { data: csvData });

        res.status(200).json({ recommendations: response.data });

    } catch (error) {
        console.error("Error sending data to Flask:", error);
        res.status(500).json({ message: "Failed to send data to Flask" });
    }
};