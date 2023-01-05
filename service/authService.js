const { User } = require("./schemas/userModel");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "igorellovich@meta.ua",
        pass: process.env.PASSWORD,
    },
};

const registration = async(email, password, avatar, verificationToken) => {
    const user = new User({ email, password, avatar, verificationToken });
    await user.save();

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
        from: "igorellovich@meta.ua",
        to: `${email}`,
        subject: "Nodemailer test",
        text: `Hello, please verify your account:`,
        html: `<a href='http://localhost:3000/api/user/verify/${verificationToken}'>CLIK THIS LINK</a>`,
    };

    transporter
        .sendMail(emailOptions)
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
};

const login = async(email, password) => {
    const user = await User.findOne({ email });
    console.log(await bcrypt.compare(password, user.password));

    if (!user) {
        console.error("Invalid email");
    }
    if ((await bcrypt.compare(password, user.password)) === false) {
        console.log(password);
        console.log(user.password);
        console.error("Invalid password");
    } else {
        const token = jwt.sign({
                _id: user._id,
                createdAt: user.createdAt,
            },
            process.env.JWT_SECRET
        );
        return token;
    }
};

const reSendEmail = async(req, res, next) => {
    const { email } = req.body;
    if (email) {
        const user = await User.findOne({ email: email });

        if (user.verify !== true) {
            const transporter = nodemailer.createTransport(config);
            const emailOptions = {
                from: "igorellovich@meta.ua",
                to: `${email}`,
                subject: "Nodemailer test",
                text: `Hello, please verify your account:`,
                html: `<a href='http://localhost:3000/api/user/verify/${user.verificationToken}'>CLIK THIS LINK</a>`,
            };

            transporter
                .sendMail(emailOptions)
                .then((info) => console.log(info))
                .catch((err) => console.log(err));

            res.status(200).json({
                message: "Verification email sent",
            });
        } else {
            res.status(400).json({
                message: "Verification has already been passed",
            });
        }
    } else {
        res.status(400).json({
            message: "missing required field email",
        });
    }
};

module.exports = {
    registration,
    login,
    reSendEmail,
};