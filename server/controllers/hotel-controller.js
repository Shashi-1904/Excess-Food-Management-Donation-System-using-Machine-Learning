const FoodDonation = require("../models/donation-model");
const HotelLog = require('../models/hotel-log-schema');

// Add a daily log for a hotel
exports.postHotelLogs = async (req, res) => {
    try {
        const hotelEmail = req.user.email;
        const { date, day, eventOrFestival, foodType, foodPreparedKg, customersserved, foodLeftoverKg, weather } = req.body;

        // Find hotel log by email
        let hotelLog = await HotelLog.findOne({ hotelEmail });

        // Create new log entry
        const newLogEntry = {
            date,
            day,
            eventOrFestival,
            foodType,
            foodPreparedKg,
            customersserved,
            foodLeftoverKg,
            weather
        };

        if (!hotelLog) {
            // Create a new hotel log document
            hotelLog = new HotelLog({
                hotelEmail,
                dailyLogs: [newLogEntry]
            });
        } else {
            // Append new log to existing hotel's dailyLogs
            hotelLog.dailyLogs.push(newLogEntry);
        }

        await hotelLog.save();
        res.status(201).json({ message: 'Log added successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get donation history for a hotel by matching email
exports.getHotelDonations = async (req, res) => {
    try {
        const hotelEmail = req.user.email;

        const donations = await FoodDonation.find({ email: hotelEmail }).sort({ createdAt: -1 });

        if (!donations.length) {
            return res.status(404).json({ message: "No donations found" });
        }

        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
