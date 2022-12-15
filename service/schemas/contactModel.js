const mongoose = require("mongoose");
const Joi = require("joi");

const contact = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    min: 8,
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
    min: 8,
    validate: {
      validator: function (value) {
        return value.includes("@");
      },
      message: `Your email should include "@" symbol`,
    },
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
    min: 8,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(6).required(),
  phone: Joi.string().min(6).required(),
});

const idSchema = Joi.object({
  id: Joi.string().required(),
});

const Contact = mongoose.model("contacts", contact);

module.exports = { Contact, contactSchema, idSchema };
