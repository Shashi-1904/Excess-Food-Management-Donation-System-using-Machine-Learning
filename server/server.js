require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const donorRoute = require("./router/doner-router");
const adminRouter = require("./router/admin-router");
const volunteerRouter = require("./router/volunteer-router")
const uploadRoutes = require("./router/uploadRoutes");
const FoodRequestRoutes = require("./router/foodRequest-router");
const UserRoutes = require("./router/user-router");
const HotelRoutes = require("./router/hotel-router")
const donationCron = require("./cron/donationCron");

//allow cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

//Middleware 
app.use(express.json());


//api calls mounting
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/donor", donorRoute)
app.use("/api/admin", adminRouter);
app.use("/api/volunteer", volunteerRouter);
app.use("/api/predictions", uploadRoutes);
app.use("/api/ngo", FoodRequestRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/hotel", HotelRoutes);

//error Middleware
app.use(errorMiddleware);


connectDB().then(() => {
    donationCron();
    app.listen(PORT, (req, res) => {
        console.log(`listening on PORT ${PORT}`)
    });

});