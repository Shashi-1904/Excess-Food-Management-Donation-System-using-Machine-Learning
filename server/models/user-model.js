const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: ['hotel', 'donor', 'volunteer'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

//Middleware function for securing passward before saving 
userSchema.pre('save', async function () {

    const user = this;
    if (!user.isModified("passward")) {
        next();
    }
    try {
        const saltround = await bcrypt.genSalt(10);
        const hash_passward = await bcrypt.hash(user.passward, saltround);
        user.passward = hash_passward


    } catch (error) {
        next(error);

    }

});

//json web token genration
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            role: this.role,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }

        )
    } catch (error) {
        console.log(error);
    }
}



//compare passward
userSchema.methods.comparePassward = async function (passward) {
    return bcrypt.compare(passward, this.passward)
}

//create collection
const User = new mongoose.model("User", userSchema);

module.exports = User;