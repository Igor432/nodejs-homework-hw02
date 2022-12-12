const mongoose = require("mongoose");

const contact = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        min: 8,
        required: true,
        validate: {
            validator: function(value) {
                return value.includes('@')
            },
            message: `There's no @ in your email`
        }

    },
    phone: {
        type: String,
        required: true,
        min: 7

    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const Contact = mongoose.model("contacts", contact)

module.exports = { Contact };