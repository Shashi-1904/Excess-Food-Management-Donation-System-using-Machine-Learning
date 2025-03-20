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
    expiresAt: { // Exact expiry timestamp
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


// const mongoose = require("mongoose");

// const foodDonationSchema = new mongoose.Schema({
//     foodName: {
//         type: String,
//         required: true
//     },
//     foodType: {
//         type: String,
//         required: true,
//         enum: ['veg', 'non-veg']
//     },
//     category: {
//         type: String,
//         required: true,
//         enum: ['raw', 'cooked', 'packed']
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 1
//     },
//     expiry: { // Expiry duration in hours
//         type: Number,
//         required: true,
//         min: 1
//     },
    // expiresAt: { // Exact expiry timestamp
    //     type: Date,
    //     required: true
    // },
//     email: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         required: true,
//         enum: ['pending', 'assigned', 'picked', 'completed'],
//         default: 'pending'
//     },
//     latitude: {
//         type: Number,
//         required: true
//     },
//     longitude: {
//         type: Number,
//         required: true
//     },
//     assignedTo: {
//         type: String,
//         default: null
//     },
//     deliveredTo: {
//         type: String,
//         default: null
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Automatically calculate `expiresAt` before saving
// foodDonationSchema.pre("save", function (next) {
//     if (this.isModified("expiry") || this.isNew) {
//         this.expiresAt = new Date(this.createdAt.getTime() + this.expiry * 60 * 60 * 1000);
//     }
//     next();
// });

// // **TTL Index - Automatically remove expired donations**
// foodDonationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);

// module.exports = FoodDonation;





// const cron = require("node-cron");
// const FoodDonation = require("./models/FoodDonation"); // Adjust path if needed
// const mongoose = require("mongoose");
// require("dotenv").config(); // Load environment variables (if needed)

// // Run the cron job every hour
// cron.schedule("0 * * * *", async () => {
//     console.log("Running cron job to check expired donations...");
    
//     const currentTime = new Date();
    
//     try {
//         // Mark expired donations as "expired"
//         const result = await FoodDonation.updateMany(
//             { expiresAt: { $lte: currentTime }, status: { $nin: ['completed', 'expired'] } },
//             { $set: { status: "expired" } }
//         );

//         console.log(`Marked ${result.modifiedCount} donations as expired.`);
//     } catch (error) {
//         console.error("Error updating expired donations:", error);
//     }
// });
