require('dotenv').config()
const jwt = require('jsonwebtoken')

function jwtGen(user_id) {
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGen