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
    expiresAt: {
        type: Date,

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
        enum: ['pending', 'assigned', 'arriving', 'picked', 'completed'],
        default: 'pending'
    },
    eta: {
        type: Number,
        default: null
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: String,
        default: null
    },
    deliveredTo: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

foodDonationSchema.pre("save", function (next) {
    if (this.isModified("expiry") || this.isNew) {
        this.expiresAt = new Date(this.createdAt.getTime() + this.expiry * 60 * 60 * 1000);
    }
    next();
});

const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);


module.exports = FoodDonation;

