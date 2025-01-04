const User = require("../models/user-model");
const FoodDonation = require("../models/donation-model");

// Function to get donations assigned to a specific volunteer
exports.getAssignedDonations = async (req, res) => {
    try {
        // Get the volunteer's details from the token (userID)
        const volunteer = await User.findById(req.user.id);

        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        if (volunteer.role !== 'volunteer') {
            return res.status(403).json({ message: "Not authorized. Only volunteers can view assigned donations." });
        }

        // Find donations assigned to this volunteer
        const donations = await FoodDonation.find({ assignedTo: volunteer.email });

        if (!donations.length) {
            return res.status(404).json({ message: "No donations assigned to you." });
        }

        res.status(200).json({ donations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Optional: Function to change the status of a donation (if a volunteer completes a donation)
exports.updateDonationStatus = async (req, res) => {
    const { donationId, status } = req.body;

    try {
        const donation = await FoodDonation.findById(donationId);

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        // Check if the donation is assigned to the volunteer
        if (donation.assignedTo !== req.user.username) {
            return res.status(403).json({ message: "You are not assigned to this donation" });
        }

        // Update donation status
        donation.status = status;
        await donation.save();

        res.status(200).json({ message: "Donation status updated successfully", donation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
