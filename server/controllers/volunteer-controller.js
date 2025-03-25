const User = require("../models/user-model");
const FoodDonation = require("../models/donation-model");
const FoodRequest = require('../models/request-model');
// Function to get donations assigned to a specific volunteer
exports.getAssignedDonations = async (req, res) => {
    try {
        const volunteer = await User.findById(req.user.id);

        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        if (volunteer.role !== 'volunteer') {
            return res.status(403).json({ message: "Not authorized. Only volunteers can view assigned donations." });
        }

        // Fetch assigned donations
        const donations = await FoodDonation.find({ assignedTo: volunteer.email });

        // Fetch assigned food requests
        const foodRequests = await FoodRequest.find({ fulfilledBy: volunteer.email });

        if (!donations.length && !foodRequests.length) {
            return res.status(404).json({ message: "No donations or food requests assigned to you." });
        }

        res.status(200).json({ donations, foodRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.updateDonationStatus = async (req, res) => {
    const { donationId, status, minutes } = req.body;
    const volunteerId = req.user.email;

    try {
        // Find the donation
        const donation = await FoodDonation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }


        if (donation.assignedTo !== volunteerId) {
            return res.status(403).json({ message: "You are not assigned to this donation" });
        }

        donation.status = status;
        if (status === "arriving" && minutes) {
            donation.eta = minutes;
        } else if (status !== "arriving") {
            donation.eta = null;
        }
        await donation.save();


        if (status === "completed") {
            await User.findOneAndUpdate(
                { email: volunteerId },
                { $pull: { donationsAssigned: donationId } }
            );
        }

        return res.status(200).json({ message: "Donation status updated successfully", donation });
    } catch (error) {
        console.error("Error updating donation status:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


exports.getMatchingRequests = async (req, res) => {
    const volunteerId = req.user.email;
    const margin = 3;

    try {
        const assignedDonations = await FoodDonation.find({
            assignedTo: volunteerId,
            status: { $in: ['assigned', 'picked'] },
        });

        if (!assignedDonations.length) {
            return res.status(404).json({ message: "No assigned donations found for the volunteer." });
        }

        let matchingRequests = [];

        for (const donation of assignedDonations) {
            const { foodType, category, quantity } = donation;
            const currentDate = new Date();

            const requests = await FoodRequest.find({
                foodType: foodType,
                category: category,
                quantityNeeded: { $gte: quantity - margin, $lte: quantity + margin },
                status: 'pending',
            }).lean();
            if (requests.length) {
                const filteredRequests = requests.filter(request => {
                    const neededByDate = new Date(request.neededBy);
                    return neededByDate > currentDate;
                });
                matchingRequests.push(...filteredRequests);
            }
        }

        if (!matchingRequests.length) {
            return res.status(404).json({ message: "No matching food requests found." });
        }

        return res.status(200).json({
            message: "Matching food requests found.",
            requests: matchingRequests,
        });

    } catch (error) {
        console.error("Error fetching matching requests:", error);
        return res.status(500).json({ message: "An error occurred. Please try again later." });
    }
};

exports.updateRequestStatus = async (req, res) => {
    const { requestId, status } = req.body;
    const email = req.user.email;

    try {
        const request = await FoodRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Food request not found" });
        }

        // Update status
        request.status = status;


        if (['assigned', 'Accepted', 'picked', 'In Progress', 'completed'].includes(status)) {
            request.fulfilledBy = email;
        }

        await request.save();

        res.status(200).json({ message: "Request status updated successfully", request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getUserLocation = async (req, res) => {
    try {
        const userEmail = req.body.email;

        // Find the user by email and select only latitude and longitude fields
        const user = await User.findOne({ email: userEmail }).select("latitude longitude");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User location fetched successfully",
            data: {
                latitude: user.latitude,
                longitude: user.longitude
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user location",
            error: error.message
        });
    }
};



exports.getVolunteerNotifications = async (req, res) => {
    const volunteerEmail = req.user.email;

    try {

        const volunteer = await User.findOne({ email: volunteerEmail })
            .populate({
                path: "donationsAssigned",
                match: { status: "assigned" }
            });

        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        // Check if there are assigned donations
        if (!volunteer.donationsAssigned || volunteer.donationsAssigned.length === 0) {
            return res.status(200).json({
                success: true,
                notifications: [],
                message: "No new donations assigned."
            });
        }

        // Prepare notifications from assigned donations
        const notifications = volunteer.donationsAssigned.map(donation => ({
            donationId: donation._id,
            type: "assignment",
            message: `New donation ${donation.foodName} assigned to you.`,
            timestamp: new Date().toISOString()
        }));

        res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        console.error("Error fetching volunteer notifications:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.changeUserStatus = async (req, res) => {
    const email = req.user.email;
    const { isActive } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the isActive status
        user.isActive = isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User status updated successfully. ${email} is now ${isActive ? "Active" : "Inactive"}.`
        });

    } catch (error) {
        console.error("Error changing user status:", error);
        res.status(500).json({ message: "Server error" });
    }
};