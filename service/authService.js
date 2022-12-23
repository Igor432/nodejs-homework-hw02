const { User } = require("./schemas/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registration = async(email, password, avatar) => {
    const user = new User({ email, password, avatar });
    await user.save();

};


const login = async(email, password) => {
    const user = await User.findOne({ email });
    console.log(await bcrypt.compare(password, user.password))

    if (!user) {
        console.error("Invalid email");
    }
    if (await bcrypt.compare(password, user.password) === false) {
        console.log(password)
        console.log(user.password)
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
}


module.exports = {
    registration,
    login
};