const FoodDonation = require("../models/donation-model");

// Fetch all donations that are not assigned and not delivered
exports.getAvailableDonations = async (req, res) => {
    try {
        const donations = await FoodDonation.find({
            assignedTo: null,
            deliveredTo: null
        });

        res.status(200).json({
            success: true,
            message: "Available donations fetched successfully.",
            data: donations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donations.",
            error: error.message
        });
    }
};

// Update the deliveredTo field to the NGO's email
exports.requestDonation = async (req, res) => {
    const volunteerEmail = req.user.email; // Extracted from the token
    const { donationId } = req.body; // Donation ID passed from the frontend

    try {
        const donation = await FoodDonation.findById(donationId);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found."
            });
        }

        if (donation.deliveredTo !== null) {
            return res.status(400).json({
                success: false,
                message: "This donation has already been assigned to another NGO."
            });
        }

        donation.deliveredTo = volunteerEmail;
        await donation.save();

        res.status(200).json({
            success: true,
            message: "Donation successfully assigned to your NGO.",
            data: donation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error requesting donation.",
            error: error.message
        });
    }
};
