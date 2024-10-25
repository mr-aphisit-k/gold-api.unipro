const jwt = require("jsonwebtoken")
let jwtAuth = process.env.JWT_AUTH

module.exports.signJWT = (data, exp = "1d") => {
    return jwt.sign(data, jwtAuth, { algorithm: "HS256", expiresIn: exp })
}

module.exports.decodeJWT = async (token) => {
    return jwt.verify(token, jwtAuth, (err, decoded) => {
        if (err) {
            return false
        }
        return decoded
    })
}
