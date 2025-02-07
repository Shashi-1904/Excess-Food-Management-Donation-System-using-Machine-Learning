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
            day: {
                type: String,
                required: true
            },
            eventOrFestival: {
                type: String,
                required: true
            },
            foodType: {
                type: String,
                required: true
            },
            foodPreparedKg: {
                type: Number,
                required: true
            },
            customersserved: {
                type: Number,
                required: true
            },
            foodLeftoverKg: {
                type: Number,
                required: true
            },
            weather: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

const HotelLog = mongoose.model('HotelLog', hotelLogSchema);
module.exports = HotelLog;
