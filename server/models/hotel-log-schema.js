const mongoose = require('mongoose');

const hotelLogSchema = new mongoose.Schema({
    hotelEmail: {
        type: String,
        required: true
    },
    dailyLogs: [
        {
            date: {
                type: Date,
                required: true
            },
            dishName: {
                type: String,
                required: true
            },
            quantityPrepared: {
                type: Number,
                required: true
            },
            dayOfWeek: {
                type: String,
                required: true
            },
            month: {
                type: String,
                required: true
            },
            weekend: {
                type: String,
                required: true
            },
            festivalName: {
                type: String,
                required: false  // Optional, in case there's no festival
            },
            festivalType: {
                type: String,
                required: false  // Optional
            },
            daysBeforeAfterFestival: {
                type: Number,
                required: false
            },
            totalCustomers: {
                type: Number,
                required: true
            },
            ordersPerDish: {
                type: Number,
                required: true
            },
            weather: {
                type: String,
                required: true
            },
            specialOffer: {
                type: String,
                required: true
            },
            quantityWasted: {
                type: Number,
                required: true
            },
            holiday: {
                type: String,
                required: true
            },
            event: {
                type: String,
                required: false
            },
            deliveryOrders: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true });

const HotelLog = mongoose.model('HotelLog', hotelLogSchema);
module.exports = HotelLog;
