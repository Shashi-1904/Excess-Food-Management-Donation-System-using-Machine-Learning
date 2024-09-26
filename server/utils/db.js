const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection to mongodb successfull!!!")
    } catch (error) {
        console.log("Connection to databse failed");

    }
};

module.exports = connectDB;