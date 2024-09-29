const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true,
        enum: ['veg', 'non-veg']  // Ensures only these two values are allowed
    },
    category: {
        type: String,
        required: true,
        enum: ['raw', 'cooked', 'packed']  // Restricts the input to these categories
    },
    quantity: {
        type: Number,
        required: true,
        min: 1  // Ensures quantity is a positive number
    },
    expiry: {
        type: Number,
        required: true,
        min: 1  // Expiry in hours must be positive
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
    }
});

// Create the Mongoose model
const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);

// Export the model
module.exports = FoodDonation;
