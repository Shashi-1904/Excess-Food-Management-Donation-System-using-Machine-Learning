const FoodRequest = require("../models/request-model");

const foodRequestForm = async (req, res) => {
    try {
        const response = req.body;
        await FoodRequest.create(response);
        return res.status(200).json({ message: "Food request submitted successfully!" });
    } catch (error) {
        console.error("Error while submitting food request:", error);
        return res.status(500).json({ message: "Failed to submit food request." });
    }
};

module.exports = foodRequestForm;
