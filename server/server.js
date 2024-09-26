require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./utils/db");

connectDB().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`listening on PORT ${PORT}`)
    });

});