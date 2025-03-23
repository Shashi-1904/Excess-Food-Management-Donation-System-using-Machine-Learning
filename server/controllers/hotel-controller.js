const FoodDonation = require("../models/donation-model");
const HotelLog = require('../models/hotel-log-schema');

// Add a daily log for a hotel
exports.postHotelLogs = async (req, res) => {
    try {
        const hotelEmail = req.user.email;

        const {
            date,
            dishName,
            quantityPrepared,
            dayOfWeek,
            month,
            weekend,
            festivalName,
            festivalType,
            daysBeforeAfterFestival,
            totalCustomers,
            ordersPerDish,
            weather,
            specialOffer,
            quantityWasted,
            holiday,
            event,
            deliveryOrders
        } = req.body;

        // Find hotel log by email
        let hotelLog = await HotelLog.findOne({ hotelEmail });

        // Create new log entry with the additional columns
        const newLogEntry = {
            date,
            dishName,
            quantityPrepared,
            dayOfWeek,
            month,
            weekend,
            festivalName,
            festivalType,
            daysBeforeAfterFestival,
            totalCustomers,
            ordersPerDish,
            weather,
            specialOffer,
            quantityWasted,
            holiday,
            event,
            deliveryOrders
        };

        if (!hotelLog) {
            // Create a new hotel log document if no log exists
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
        console.error("Error adding hotel log:", error);
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


// Get hotel notifications
exports.getHotelNotifications = async (req, res) => {
    const hotelEmail = req.user.email;

    try {
        // Find all donations belonging to the hotel
        const donations = await FoodDonation.find({ email: hotelEmail });

        // Prepare notifications
        const notifications = donations.flatMap(donation => {
            const donationId = donation._id.toString();
            const messages = [];

            // Notification for arriving status with ETA
            if (donation.status === "arriving" && donation.eta) {
                messages.push({
                    donationId,
                    type: "status",
                    message: `Volunteer is arriving in ${donation.eta} minutes to pick up the donation named ${donation.foodName}.`,
                    timestamp: new Date().toISOString()
                });
            }

            // Notification for assigned donation
            if ((donation.status === "assigned" || donation.status === "arriving") && donation.assignedTo) {
                messages.push({
                    donationId,
                    type: "assignment",
                    message: `Your donation of ${donation.foodName} has been assigned to ${donation.assignedTo}.`,
                    timestamp: new Date().toISOString()
                });
            }

            return messages;
        });

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
