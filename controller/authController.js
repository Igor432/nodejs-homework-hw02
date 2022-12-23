const { registration, login } = require("../service/authService");
const { User } = require("../service/schemas/userModel");
const gravatar = require('gravatar');
const Jimp = require("jimp");


const signUp = async(req, res, next) => {
    const { email, password } = req.body;
    const avatarLink = gravatar.profile_url(email);
    console.log(avatarLink)
    console.log(req.body)
    const newEmail = await User.findOne({ email });
    console.log(newEmail);
    if (!newEmail) {
        await registration(email, password, avatarLink);

        res.status(201).json({
            status: "Created",
            ResponseBody: {
                user: {
                    email: `${email}`,
                    subscription: "starter",
                },
            },
        })

    } else {

        res.status(409).json({
            status: "Conflict",
            ResponseBody: {
                message: "Email in use",
            },
        })
    }
    next()
};

const loginCtrl = async(req, res, next) => {
    const { email, password } = req.body;

    const token = await login(email, password);


    if (token) {
        const user = await User.findOneAndUpdate({ email: email }, { token: token })

        res.status(200).json({
            token: token,
            user: { email: user.email, subscription: user.subscription },
            message: 'success'

        })
        return res

    } else {
        res.status(400).json({
            message: "Invalid password"
        })
    }
}



const logOut = async(req, res, next) => {
    const { _id } = req.user;
    console.log(_id)
    const user = await User.findById(_id);
    if (user) {
        res.token = "";
        res.status(200).json({
            status: "success",
            token: "deleted",
        });
    } else {
        res.status(401).json({
            status: "Unauthorized",
            message: "Not authorized",
        });
    }
};

const checkCurrent = async(req, res, next) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    console.log(user);
    if (_id) {
        res.status(200).json({
            ResponseBody: {
                status: "success",
                email: `${user.email}`,
                subscription: `${user.subscription}`,
            },
        });
    } else {
        res.status(401).json({
            status: "Unauthorized",
            ResponseBody: {
                message: "Not authorized",
            },
        });
    }
};

const uploadCtrl = async(req, res, next) => {

    const { avatar } = req.user
    const { _id } = req.user

    try {

        await User.findByIdAndUpdate(_id, { avatar })
        const updUser = await User.findById(_id)
        Jimp.read(avatar)
            .then(img => {
                return img
                    .resize(250, 250) // resize
                    .quality(60) // set JPEG quality
                    .greyscale() // set greyscale
                    .write(`${avatar}`); // save
            })
            .catch(err => {
                console.error(err);
            });

        res.status(200).json({
            message: 'success',
            user: updUser
        })
    } catch (err) {
        res.status(400).json({
            message: 'failed',

        })
    }
}





module.exports = {
    signUp,
    loginCtrl,
    logOut,
    checkCurrent,
    uploadCtrl
};