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
    encrypt = (r1, r2, text) => {
        const hash = getHashWithR1R2(r1, r2)
        const iv = reverseString(hash).substring(0, 12)
        const r3 = hash.substring(0, 16)
        // AES 256 GCM Mode
        const cipher = crypto.createCipheriv("aes-128-gcm", r3, iv)

        // encrypt the given text
        const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()])

        // extract the auth tag
        const tag = cipher.getAuthTag()
        // generate output
        return Buffer.concat([encrypted, tag]).toString("hex")
    }
    decrypt = (r3, iv, encdata) => {
        // base64 decoding
        let bData = Buffer.from(encdata, "hex")

        const tag = bData.slice(bData.length - 16, bData.length)
        const text = bData.slice(0, bData.length - tag.length)

        const decipher = crypto.createDecipheriv("aes-128-gcm", r3, iv)
        decipher.setAuthTag(tag)

        const decrypted = decipher.update(text, "binary", "utf8") + decipher.final("utf8")

        return decrypted
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
