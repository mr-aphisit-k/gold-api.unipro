class Helper {
    constructor() {
       
    }

    valueCash = (value) => {
        let valueCash = (Math.floor(value * 100) / 100).toFixed(2)
        return valueCash
    }
    goldToTHB = (goldSpot, permium, exchangeRate, goldPercent) => {
        return Math.round(Math.round(((goldSpot + permium) * exchangeRate * 32.148) / 65.6) * goldPercent)
    }
}

module.exports = Helper