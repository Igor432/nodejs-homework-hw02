const jwt = require("jsonwebtoken");
const { User } = require("../service/schemas/userModel");

/*
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk3Mzk1NzIwNGZiZmExYjBhNGQyMDUiLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTEyVDE0OjIyOjQyLjIwMFoiLCJpYXQiOjE2NzA4NTU1NzZ9.fZIE_f2DerjsL8qGstLSddPrLszP5xJHFX1lkcDW3aI
*/

const authMiddleWare = async(req, res, next) => {

    if (req.headers.authorization === undefined) {

        res.status(401).json({
            message: 'Please, provide token'
        })
    } else {

        const [tokenType, token] = req.headers.authorization.split(' ');
        console.log(tokenType, token);

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const checkedUser = await User.findById(user._id)
            console.log(checkedUser)
            if (checkedUser.token === token) {

                req.token = token;
                req.user = user;

                next();
            }
        } catch (err) {
            console.log(err);
            res.status(401).json({
                status: "Unauthorized",
                message: 'Not authorized'
            })
            next(err);
        }
    }
}



module.exports = {
    authMiddleWare,
};