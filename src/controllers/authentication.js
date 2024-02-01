const { isEmpty } = require("class-validator")
module.exports.login = async (req, res) => {
    try {
        res.send("Hello")
    } catch (error) {
        res.send(error)
    }
}