const { User } = require("./schemas/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registration = async(email, password) => {
    const user = new User({ email, password });
    await user.save();
};


const login = async(email, password) => {
    const user = await User.findOne({ email });
    console.log(await bcrypt.compare(password, user.password))

    if (!user) {
        console.error("Invalid email");
    }
    if (!await bcrypt.compare(password, user.password)) {
        console.error("Invalid password");
    } else {
        const token = jwt.sign({
                _id: user._id,
                createdAt: user.createdAt,
            },
            process.env.JWT_SECRET
        )

        await User.findByIdAndUpdate(user._id, { token: token })
        return token;
    }
}



module.exports = {
    registration,
    login
};