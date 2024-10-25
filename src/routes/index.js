const express = require("express")
const router = express.Router()

const rateLimit = require("express-rate-limit")

const controllerAuthentication = require("../controllers/authentication")
const controllerGoldPrice = require("../controllers/goldprice")
const controllerSlipVerify = require("../controllers/slipverify")
const middleware = require("../middlewares/index")

const { isEmpty } = require("class-validator")

/* A rate limit middleware. */
const rateLimiter = (req, res, next) => {
    const apiKey = req["headers"]["x-api-key"] // รับ API key จาก query parameter หรือ header

    if (isEmpty(apiKey)) {
        return res.status(401).json({ message: "Invalid API key" })
    }

    // Key ที่ใช้ใน Redis เพื่อบันทึกจำนวนการใช้งาน
    const redisKey = `rate_limit_${apiKey}`

    // ตรวจสอบจำนวน request ที่เหลืออยู่ใน Redis
    client.get(redisKey, (err, record) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" })
        }

        const currentRequestCount = record ? parseInt(record) : 0
        const requestLimit = API_KEYS[apiKey]

        if (currentRequestCount >= requestLimit) {
            return res.status(429).json({ message: "API request limit exceeded" })
        }

        // เพิ่มจำนวน request ที่ใช้ไป 1 ครั้ง
        client.set(redisKey, currentRequestCount + 1, "EX", 30 * 24 * 60 * 60) // เก็บข้อมูลใน Redis 30 วัน (30 * 24 * 60 * 60 วินาที)

        // ให้ผ่านไปยัง API ถัดไป
        next()
    })
}

// router.post("/v1/generate/api/key", controllerAuthentication.generateAuthKey)
// router.get("/v1/price", controllerGoldPrice.getGoldPriceInfo)
router.post("/webhook", controllerSlipVerify.slipVerify)
module.exports = router
