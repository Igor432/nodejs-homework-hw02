const express = require('express')
const authRoutes = express.Router()
const { registrationCtrl, loginCtrl, logOut, checkCurrent } = require('../../controller/authController')
const { authMiddleWare } = require("../../middlewares/authMiddleware");
const { validate } = require('../../middlewares/middleware');
const { userSchema } = require('../../service/schemas/userModel');

authRoutes.post('/signup', validate(userSchema), registrationCtrl)

authRoutes.post('/login', loginCtrl)



authRoutes.use(authMiddleWare)


authRoutes.get('/current', checkCurrent)

authRoutes.get('/logout', logOut)

module.exports = authRoutes