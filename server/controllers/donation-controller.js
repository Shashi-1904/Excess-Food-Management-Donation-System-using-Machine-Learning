const User = require("../models/user-model");
const FoodDonation = require("../models/donation-model");

// Function to calculate distance 
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (degree) => (degree * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

exports.getAvailableDonations = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const { latitude: userLat, longitude: userLon } = user;

        // Fetch donations 
        const donations = await FoodDonation.find({
            status: { $in: ["pending", "assigned"] },
            deliveredTo: null
        });

        // Filter donations 
        const nearbyDonations = donations.filter(donation => {
            const distance = calculateDistance(
                userLat,
                userLon,
                donation.latitude,
                donation.longitude
            );
            return distance <= 10;
        });

        res.status(200).json({
            success: true,
            message: "Nearby donations fetched successfully.",
            data: nearbyDonations
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
    const volunteerEmail = req.user.email;
    const { donationId } = req.body;

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
