const crypto = require("crypto")

class Encryption {
    constructor() {}

    getHashWithR1R2 = (r1, r2) => {
        let hash = createHash("sha256")
            .update(r1 + r2)
            .digest("hex")
        return hash
    }
    reverseString = (str) => {
        return str.split("").reverse().join("")
    }
    encrypt = (uuid) => {
        const ivLength = 16
        const algorithm = "aes-256-gcm"
        const secret = Buffer.from(process.env.API_SECRET)
        const iv = crypto.randomBytes(ivLength) // สร้าง IV (Initialization Vector)
        const cipher = crypto.createCipheriv(algorithm, secret, iv)

        const encryptedBuffer = Buffer.concat([cipher.update(uuid, "utf8"), cipher.final()])
        const tag = cipher.getAuthTag() // รับ authentication tag
        const encText = `${iv.toString("hex")}${encryptedBuffer.toString("hex")}${tag.toString("hex")}`

        console.log("IV", iv.toString("hex"))
        console.log("BUFFER", encryptedBuffer.toString("hex"))
        console.log("TAG", tag.toString("hex"))

        console.log(encText)
        return Buffer.from(encText).toString("base64")
    }
    decrypt = (encryptedText) => {
        encryptedText = Buffer.from(encryptedText, "base64").toString("utf-8")

        const algorithm = "aes-256-gcm"
        const secret = Buffer.from(process.env.API_SECRET)

        const ivHex = encryptedText.slice(0, 32)
        const encryptedHex = encryptedText.slice(32, encryptedText.length - 32)
        const tagHex = encryptedText.slice(encryptedText.length - 32)

        
        const iv = Buffer.from(ivHex, "hex")
        const encryptedTextBuffer = Buffer.from(encryptedHex, "hex")
        const tag = Buffer.from(tagHex, "hex")


        const decipher = crypto.createDecipheriv(algorithm, secret, iv)
        decipher.setAuthTag(tag)

        const decryptedBuffer = Buffer.concat([decipher.update(encryptedTextBuffer), decipher.final()])

        return decryptedBuffer.toString("utf8")
    }
    createHash = async () => {
        try {
            return crypto.createHash("sha256").update(crypto.randomBytes(16)).digest("hex").substring(0, 16)
        } catch (error) {
            return error
        }
    }
}

module.exports = Encryption
