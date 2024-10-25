const { isEmpty } = require("class-validator")
const Encryption = require("../modules/encrypt")
const LoggingStep = require("../modules/logging")
const RestResponse = require("../modules/response")

const dayjs = require("dayjs")
module.exports.generateAuthKey = async (req, res) => {
    const service = "GenerateAuthKey"

    const encrypt = new Encryption()
    const logST = new LoggingStep()
    const response = new RestResponse()
    const symbol = req.params.symbol;
    const currency = req.params.currency;
    const date = req.params.currency;

    try {
        logST.set("Generate API Key")
        const apiKey = encrypt.encrypt(uuid)
        const data = {
            x_api_key: apiKey,
        }
        logST.set("Response")
        res.send(response.status("00000", service, data, logST.get()))
    } catch (error) {
        logST.set(String(error))

        res.send(response.status("90000", service, String(error), logST.get()))
    }
}