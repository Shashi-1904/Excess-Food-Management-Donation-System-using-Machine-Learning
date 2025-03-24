const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
    volunteerEmail: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true
    },
    interactionScore: {
        type: Number,
        default: 1,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Interaction = mongoose.model("Interaction", interactionSchema);
module.exports = Interaction;
