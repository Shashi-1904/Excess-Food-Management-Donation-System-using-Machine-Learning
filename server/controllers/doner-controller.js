const FoodDonation = require("../models/donation-model");

const donateFoodForm = async (req, res) => {
    try {
        const response = req.body;
        const donation = await FoodDonation.create(response); // Store the created donation
        return res.status(200).json({
            message: "Food donation request submitted successfully!",
            donation // Include the created donation in the response
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to submit food donation request.",
            error: error.message
        });
    }
};


module.exports = donateFoodForm;
