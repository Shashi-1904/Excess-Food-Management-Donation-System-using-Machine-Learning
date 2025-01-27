const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
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
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    expiry: {
        type: Number,
        required: true,
        min: 1
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
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
    assignedTo: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);


module.exports = FoodDonation;
