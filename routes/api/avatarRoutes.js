const multer = require("multer");
const path = require("path");
const { User } = require("../../service/schemas/userModel");

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzliM2YyZDdkNzZlZWIxODYzMGI3NzkiLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTE1VDE1OjM3OjAxLjM2OFoiLCJpYXQiOjE2NzEyMDg1MzF9.7-UMYTBxELVUPh_jN7XRAcDurFAum2G3nWz7iN5CaIw
*/

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.resolve("./public/avatars"));
    },
    filename(req, file, cb) {
        const { _id } = req.user;
        const [filename, extension] = file.originalname.split(".");
        cb(null, `${req.user._id}.${extension}`);

        req.user.avatar = path.resolve(`./public/avatars/${_id}.${extension}`);

        User.findByIdAndUpdate(_id, {
            avatar: path.resolve(`./public/avatars/${_id}.${extension}`),
        });
    },
});

const upload = multer({
    storage: storage,
});

module.exports = {
    upload,
};