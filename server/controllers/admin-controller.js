const User = require("../models/user-model");
const FoodDonation = require("../models/donation-model");
const FoodRequest = require("../models/request-model")
const Contact = require("../models/contact-model");

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

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message,
        });
    }
};

// Get all donations
const getAllRequests = async (req, res) => {
    try {
        const requests = await FoodRequest.find({});
        res.status(200).json({
            success: true,
            data: requests,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donations",
            error: error.message,
        });
    }
};

// Get all Requests
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
        const volunteers = await User.find({ role: 'volunteer' }).select('email');

        if (!volunteers) {
            return res.status(404).json({ message: 'No volunteers found' });
        }

        res.status(200).json({ emails: volunteers.map(user => user.email) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const assignDonation = async (req, res) => {
    const { donationId, userEmail } = req.body;

    if (!donationId || !userEmail) {
        return res.status(400).json({
            success: false,
            message: "Donation ID and User Email are required."
        });
    }

    try {
        const donation = await FoodDonation.findById(donationId);
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found."
            });
        }

        if (donation.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Donation is already assigned or completed."
            });
        }

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Update the donation
        donation.status = "assigned";
        donation.assignedTo = userEmail;
        await donation.save();

        return res.status(200).json({
            success: true,
            message: "Donation successfully assigned.",
            data: donation
        });
    } catch (error) {
        console.error("Error assigning donation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

// Controller function to reply to a contact message
const replyToMessage = async (req, res) => {
    try {
        const { contactId, reply } = req.body;

        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Contact message not found" });
        }

        contact.reply = reply;
        await contact.save();

        res.status(200).json({ message: "Reply sent successfully", contact });
    } catch (error) {
        console.error("Error replying to contact message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all contact messages
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Export controller functions
module.exports = {
    getAllUsers,
    getAllDonations,
    getVolunteerEmails,
    assignDonation,
    getAllRequests,
    replyToMessage,
    getAllContacts,
    deleteUser
};
