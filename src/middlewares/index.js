const { isEmpty } = require("class-validator")
const Encryption = require("../modules/encrypt")
const LoggingStep = require("../modules/logging")
const RestResponse = require("../modules/response")
exports.validateAuthKey = async (req, res, next) => {
    // const logST = new LoggingStep()
    // const response = new RestResponse()
    const encrypt = new Encryption()
    try {
        const apiKey = req["headers"]["x-api-key"]
        
        if (isEmpty(apiKey)) {
            throw new Error("API Key Error / API Key Not Match")
        }

        const decrypt = encrypt.decrypt(apiKey)
        console.log(decrypt)
        next()
    } catch (error) {
        res.status(402).send(String(error))
    }
}


