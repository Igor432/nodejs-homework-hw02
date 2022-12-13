const mongoose = require("mongoose");
const Joi = require("joi");

const contact = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        min: 8,
        validate: {
            validator: function(value) {
                return value.includes("@");
            },
            message: `There's no @ in your email`,
        },
    },
    phone: {
        type: String,
        min: 7,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const bodyScheme = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().min(8),
    phone: Joi.string().required().min(6),
});

const idValidation = Joi.object({
    id: Joi.string().required(),
});

const Contact = mongoose.model("contacts", contact);

module.exports = { Contact, bodyScheme, idValidation };