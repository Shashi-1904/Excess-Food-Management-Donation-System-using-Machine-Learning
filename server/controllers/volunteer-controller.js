const User = require("../models/user-model");
const FoodDonation = require("../models/donation-model");
const FoodRequest = require('../models/request-model');
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
        if (donation.assignedTo !== req.user.email) {
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



exports.getMatchingRequests = async (req, res) => {
    const volunteerId = req.user.email; // Assuming the logged-in volunteer's ID is in req.user
    const margin = 3; // Margin for quantity comparison

    try {
        // Find all donations assigned to the logged-in volunteer
        const assignedDonations = await FoodDonation.find({
            assignedTo: volunteerId,
            status: { $in: ['assigned', 'picked'] }, // Consider only ongoing donations
        });

        if (!assignedDonations.length) {
            return res.status(404).json({ message: "No assigned donations found for the volunteer." });
        }

        // Extract relevant fields from assigned donations
        let matchingRequests = [];  // Initialize matchingRequests outside the loop

        for (const donation of assignedDonations) {
            const { foodType, category, quantity } = donation;

            // Find matching requests
            const currentDate = new Date();  // Current date to compare

            // Step 1: Retrieve results without filtering by `neededBy`
            const requests = await FoodRequest.find({
                foodType: foodType,
                category: category,
                quantityNeeded: { $gte: quantity - margin, $lte: quantity + margin },
                status: 'pending',
            }).lean();  // Use .lean() for better performance (raw JavaScript objects)

            if (requests.length) {
                // Step 2: Filter the results in JavaScript
                const filteredRequests = requests.filter(request => {
                    const neededByDate = new Date(request.neededBy);  // Convert to Date object if it's not
                    return neededByDate > currentDate;  // Compare `neededBy` with current date
                });

                // Push matching filtered requests to the main matchingRequests array
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
