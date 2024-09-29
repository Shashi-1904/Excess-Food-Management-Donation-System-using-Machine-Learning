const FoodDonation = require("../models/donation-model");

const donateFoodForm = async (req, res) => {
    try {
        const response = req.body;
        await FoodDonation.create(response);
        return res.status(200).json({ message: "Food donation request submitted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to submit food donation request." });
    }
};

module.exports = donateFoodForm;
