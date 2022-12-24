const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Joi = require('joi');


const user = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Set your email please"],
        min: 8,
        validate: {
            validator: function(value) {
                return value.includes('@')
            },
            message: `Your email should include "@" character`
        }
    },

    password: {
        type: String,
        required: [true, "You need password"],
        min: [6, 'At least 6 characters']
    },
    avatar: {
        type: String,

    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: null,

    }

});

const userSchema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})

user.pre('save', async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})



const User = mongoose.model("users", user)

module.exports = { User, userSchema };