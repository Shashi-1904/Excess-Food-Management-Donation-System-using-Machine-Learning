const mongoose = require("mongoose")

const contactschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        required: true
    }
});

const Contact = new mongoose.model('Contact', contactschema)
module.exports = Contact;
