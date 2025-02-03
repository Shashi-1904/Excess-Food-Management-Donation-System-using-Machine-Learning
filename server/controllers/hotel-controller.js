const FoodDonation = require("../models/donation-model");

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
