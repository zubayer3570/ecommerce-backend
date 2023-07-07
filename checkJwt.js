require("dotenv").config()
const jwt = require("jsonwebtoken")

const checkJwt = (req, res, next) => {
    const { authorization } = req.headers
    if (jwt.verify(authorization, process.env.SECRET_KEY_JWT).user._id) {
        next()
    } else {
        res.send({ message: "JWT Token Incorrect!" })
    }
}

module.exports = {checkJwt}