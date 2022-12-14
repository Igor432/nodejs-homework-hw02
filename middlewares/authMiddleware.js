const jwt = require('jsonwebtoken')


const authMiddleWare = async(req, res, next) => {
    const [tokenType, token] = req.headers.authorization.split(' ')
    console.log(tokenType, token)
    if (!token) {
        console.error('Please provide token')
    }
    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        req.token = token
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({
            "message": "Not authorized"
        })
        next(console.error('Not autorized'))

    }
}

module.exports = {
    authMiddleWare
}