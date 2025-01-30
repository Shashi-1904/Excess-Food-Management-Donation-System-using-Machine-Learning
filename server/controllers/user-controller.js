const User = require("../models/user-model"); // Import User model

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { username, phoneNumber, address } = req.body;
        const userId = req.user.id; // Assuming user ID is extracted from JWT authentication middleware

        // Find and update user
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

module.exports = { updateProfile };
