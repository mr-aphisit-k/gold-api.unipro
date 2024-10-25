const { isEmpty } = require("class-validator")
const Encryption = require("../modules/encrypt")
const LoggingStep = require("../modules/logging")
const RestResponse = require("../modules/response")
const Helper = require("../modules/helper")
const dayjs = require("dayjs")
module.exports.getGoldPriceInfo = async (req, res) => {
    const service = "GoldPrice"

    const encrypt = new Encryption()
    const logST = new LoggingStep()
    const response = new RestResponse()
    const { symbol, currency, date } = req.query

    try {
        if (isEmpty(symbol) || isEmpty(currency)) {
            throw new Error("30001")
        }

        if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
            throw new Error("30002")
        }
        
        const goldBid = 2655.98
        const goldOffer = 2655.98

        const data = convert("THB", goldBid, goldOffer)


        logST.set("Response")
        res.send(response.status("00000", service, data, logST.get()))
    } catch (error) {
        logST.set(String(error))

        res.send(response.status("90000", service, String(error), logST.get()))
    }
}

const convert = (currency, goldBid, goldOffer) => {
    const helper = new Helper()

    let buy = 0
    let sell = 0
    let buyChange = 0
    let sellChange = 0
    let buyPercentChange = 0
    let sellPercentChange = 0

    const goldPriceLast = null

    if (currency == "THB") {
        const permium = -2
        const spread = 45
        const exchangeRate = 33.346
        const goldPercent = 0.965

        buy = Math.round(Math.round(((goldOffer + permium) * exchangeRate * 32.148) / 65.6) * goldPercent)
        sell = buy - spread

        if (isEmpty(goldPriceLast)) {
            buyChange = buy - 0
            sellChange = sell - 0
        } else {
            buyChange = buy - goldPriceLast.gold_buy
            sellChange = sell - goldPriceLast.gold_sell
        }

        if (buy - buyChange != 0) {
            buyPercentChange = (buyChange / (buy - buyChange)) * 100
        }
        if (sell - sellChange) {
            sellPercentChange = (sellChange / (sell - sellChange)) * 100
        }
    } else {
        buy = goldOffer
        sell = goldBid

        if (isEmpty(goldPriceLast)) {
            buyChange = buy - 0
            sellChange = sell - 0
        } else {
            buyChange = buy - goldPriceLast.gold_buy
            sellChange = sell - goldPriceLast.gold_sell
        }

        if (buy - buyChange != 0) {
            buyPercentChange = (buyChange / (buy - buyChange)) * 100
        }
        if (sell - sellChange) {
            sellPercentChange = (sellChange / (sell - sellChange)) * 100
        }
    }
    return {
        gold_buy: {
            price: helper.valueCash(buy),
            change: helper.valueCash(buyChange),
            buy_percent_change: helper.valueCash(buyPercentChange),
        },
        gold_sell: {
            price: helper.valueCash(sell),
            change: helper.valueCash(sellChange),
            sell_percent_change: helper.valueCash(sellPercentChange),
        },
    }
}
