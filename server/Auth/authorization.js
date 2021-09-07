require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const jwtToken = request.header('token')
        if(!jwtToken) {
            return res.status(403).json('Not authorized')
        }
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        req.user = payload.user
    } catch (err) {
        console.error(err.message)
        return res.status(403).json('Not authorized')
    }
}