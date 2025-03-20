const FoodDonation = require("../models/donation-model");
const User = require("../models/user-model");

//function to calculate distance 
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

// 1. Automatically Assign Donation to Nearest Volunteer
const assignVolunteer = async (req, res) => {
    try {
        const { donationId } = req.body;


        const donation = await FoodDonation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }


        const volunteers = await User.find({
            role: "volunteer",
            isActive: true,
            latitude: { $exists: true, $ne: null },
            longitude: { $exists: true, $ne: null }
        });

        if (!volunteers.length) {
            return res.status(400).json({ message: "No available volunteers" });
        }


        volunteers.sort((a, b) => {
            const distanceA = calculateDistance(donation.latitude, donation.longitude, a.latitude, a.longitude);
            const distanceB = calculateDistance(donation.latitude, donation.longitude, b.latitude, b.longitude);
            return distanceA - distanceB;
        });


        let assignedVolunteer = null;
        for (const volunteer of volunteers) {
            const assignedCount = await FoodDonation.countDocuments({ assignedTo: volunteer._id, status: "assigned" });
            if (assignedCount < 3) {
                assignedVolunteer = volunteer;
                break;
            }
        }

        if (!assignedVolunteer) {
            return res.status(400).json({ message: "No volunteer available for assignment" });
        }

        if (!Array.isArray(assignedVolunteer.donationsAssigned)) {
            assignedVolunteer.donationsAssigned = [];
        }

        donation.assignedTo = assignedVolunteer.email;
        donation.status = "assigned";
        await donation.save();


        assignedVolunteer.donationsAssigned.push(donation._id);
        await assignedVolunteer.save();

        return res.status(200).json({ message: "Donation assigned successfully", volunteer: assignedVolunteer });
    } catch (error) {
        console.error("Error assigning volunteer:", error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { assignVolunteer };
