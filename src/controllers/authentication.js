const { isEmpty } = require("class-validator")
const Encryption = require("../modules/moduleEncrypt")
const LoggingStep = require("../modules/moduleLogging")
const RestResponse = require("../modules/moduleResponse")
const dayjs = require("dayjs")
module.exports.getR2 = async (req, res) => {
    const service = "GetR2"
    const encrypt = new Encryption()
    const logST = new LoggingStep()
    const response = new RestResponse()

    try {
        logST.set("Get Hash")
        const r2 = await encrypt.createHash()

        const data = {
            r2: r2,
        }

        logST.set("Response")
        res.send(response.status("00000", service, data, logST.get()))
    } catch (error) {
        logST.set(String(error))

        res.send(response.status("90000", service, String(error), logST.get()))
    }
}
module.exports.login = async (req, res) => {
    try {
        res.send("Hello")
    } catch (error) {
        res.send(error)
    }
}
