const express = require('express')
const authRoutes = express.Router()
const { signUp, loginCtrl, logOut, checkCurrent, verificationEmail } = require('../../controller/authController')
const { authMiddleWare } = require("../../middlewares/authMiddleware");
const { reSendEmail } = require('../../service/authService')
const { validate } = require('../../middlewares/middleware');
const { userSchema } = require('../../service/schemas/userModel');
const { upload } = require('../../routes/api/avatarRoutes')
const { uploadCtrl } = require('../../controller/authController')

authRoutes.post('/signup', validate(userSchema), signUp)

authRoutes.get('/verify/:verificationToken', verificationEmail)

authRoutes.post('/verify', reSendEmail)

authRoutes.post('/login', loginCtrl)

authRoutes.use(authMiddleWare)

authRoutes.patch('/upload', upload.single('avatar'), uploadCtrl)

authRoutes.get('/current', checkCurrent)

authRoutes.get('/logout', logOut)

module.exports = authRoutes