const User = require("../models/user-model")

//register logic
const register = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { username, email, phoneNumber, password, role, address } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const userCreate = await User.create({
            username,
            email,
            phoneNumber,
            password,
            role,
            address
        });
        res.status(201).json({
            message: "Registration Successful!!!",
            token: await userCreate.generateToken(),
            userId: userCreate._id.toString()
        });
    } catch (error) {
        next(error);
    };
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const isPasswordValid = await userExists.comparePassword(password);
        if (isPasswordValid) {
            return res.status(200).json({
                message: "Login Successful!!!",
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
                role: userExists.role
            });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// user logic to send user data
const user = async (req, res) => {
    try {

        const userData = req.user;

        return res.status(200).json({ userData })




    } catch (error) {
        console.log(`error from the user route ${error}`)

    }
}

module.exports = { register, login, user };
