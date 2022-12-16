const { registration, login } = require("../service/authService");
const { User } = require("../service/schemas/userModel");


const registrationCtrl = async(req, res, next) => {
    const { email, password } = req.body;
    const newEmail = await User.findOne({ email });
    console.log(newEmail);
    if (!newEmail) {
        await registration(email, password);
        res.status(201).json({
            status: "Created",
            ResponseBody: {
                user: {
                    email: `${email}`,
                    subscription: "starter",
                },
            },
        });
    } else {

        res.status(409).json({
            status: "Conflict",
            ResponseBody: {
                message: "Email in use",
            },
        })
    }
};

const loginCtrl = async(req, res, next) => {
    const { email, password } = req.body;

    const token = await login(email, password);
    if (token) {
        res.status(200).json({
            data: token,
            message: 'success'
        })
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





module.exports = {
    registrationCtrl,
    loginCtrl,
    logOut,
    checkCurrent,
};