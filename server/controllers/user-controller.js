const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// Get user conatct history
const getUserContactHistory = async (req, res) => {
    try {
        const email = req.user.email;
        const contactHistory = await Contact.find({ email }).sort({ _id: -1 });

        return res.status(200).json({
            success: true,
            data: contactHistory
        });
    } catch (error) {
        console.error("Error fetching user contact history:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { username, phoneNumber, address } = req.body;
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, phoneNumber, address },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                username: updatedUser.username,
                phoneNumber: updatedUser.phoneNumber,
                address: updatedUser.address,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { updateProfile, getUserContactHistory };
