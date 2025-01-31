const mongoose = require("mongoose");

const foodRequestSchema = new mongoose.Schema({
    foodType: {
        type: String,
        required: true,
        enum: ['veg', 'non-veg']
    },
    category: {
        type: String,
        required: true,
        enum: ['raw', 'cooked', 'packed']
    },
    quantityNeeded: {
        type: Number,
        required: true,
        min: 1
    },
    neededBy: {
        type: Date,
        required: true
    },
    ngoName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'assigned', 'picked', 'completed'],
        default: 'pending'
    },
    fulfilledBy: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FoodRequest = mongoose.model('FoodRequest', foodRequestSchema);

module.exports = FoodRequest;
