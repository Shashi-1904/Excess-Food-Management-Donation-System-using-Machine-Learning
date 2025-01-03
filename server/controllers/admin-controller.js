const User = require("../models/user-model");
const FoodDonation = require("../models/donation-model");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
        });
    }
};

// Get all donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await FoodDonation.find({});
        res.status(200).json({
            success: true,
            data: donations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donations",
            error: error.message,
        });
    }
};

const getVolunteerEmails = async (req, res) => {
    try {
        // Find all users with the role 'volunteer'
        const volunteers = await User.find({ role: 'volunteer' }).select('email');  // Only selecting 'email' field

        if (!volunteers) {
            return res.status(404).json({ message: 'No volunteers found' });
        }

        // Send the list of volunteer emails
        res.status(200).json({ emails: volunteers.map(user => user.email) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export controller functions
module.exports = {
    getAllUsers,
    getAllDonations,
    getVolunteerEmails,
};
