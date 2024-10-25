const { isEmpty } = require("class-validator")
const Encryption = require("../modules/encrypt")
const LoggingStep = require("../modules/logging")
const RestResponse = require("../modules/response")
const Helper = require("../modules/helper")
const dayjs = require("dayjs")
module.exports.slipVerify = async (req, res) => {
    const events = req.body.events
    console.log("Received events:", events)

    // ส่ง HTTP 200 เพื่อให้ LINE รู้ว่าเราได้รับข้อมูลเรียบร้อยแล้ว
    res.sendStatus(200)
}
