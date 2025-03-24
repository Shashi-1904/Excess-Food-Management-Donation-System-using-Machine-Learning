const Interaction = require("../models/interaction-schema");

// Add or update interaction
exports.addInteraction = async (req, res) => {
    try {
        const volunteerEmail = req.user.email;
        const { locationId } = req.body;

        if (!volunteerEmail || !locationId) {
            return res.status(400).json({ message: "Email and location are required" });
        }

        // Check if the interaction already exists
        const existingInteraction = await Interaction.findOne({
            volunteerEmail,
            locationId
        });

        if (existingInteraction) {
            // Increment the score if it exists
            existingInteraction.interactionScore += 1;
            existingInteraction.timestamp = new Date();
            await existingInteraction.save();
            return res.status(200).json({
                message: "Interaction score updated",
                interaction: existingInteraction
            });
        } else {
            // Create new interaction if it doesn't exist
            const newInteraction = new Interaction({
                volunteerEmail,
                locationId,
                interactionScore: 1
            });

            await newInteraction.save();
            return res.status(201).json({
                message: "New interaction saved",
                interaction: newInteraction
            });
        }
    } catch (error) {
        console.error("Error saving interaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
