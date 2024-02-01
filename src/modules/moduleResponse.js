class RestResponse {
    /**
     * @author natpa 8-6-2018
     * @version 1.0
     * @description class to create Response object with header and body in human format
     * @param {Int|String} [code=500] response code according to http response code
     * @param {String} [optName=null] response operation name
     * @param {Object} [data=null] response body data
     */

    status(code, optName, data, logging) {
        const header = new RestHeader(code, optName)
        const body = new RestBody(data)
        return {
            responseStatus: {
                code: header.code,
                operation: header.operation,
                message: header.message,
                messageType: header.messageType,
                status: header.status,
            },
            result: body.result,
            logging: logging,
        }
    }
}
class RestHeader {
    code
    operation
    message
    messageType
    status
    constructor(code, optName) {
        const statusCode = new StatusError()
        this.code = statusCode.getCode(code)
        this.operation = optName
        this.message = statusCode.status(code)?.message
        this.messageType = ""
        this.status = statusCode.status(code)?.type
    }
}

class RestBody {
    result
    constructor(data) {
        this.result = data
    }
}

class StatusError {
    table
    constructor() {
        this.table = {
            "00000": {
                type: "SUCCESS",
                message: "",
            },
            10000: {
                type: "Get Data Error / AES not match",
                message: "ไม่สามารถเข้าถึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
            },
            10001: {
                type: "Verify code invalid.",
                message: "รหัส OTP ไม่ถูกต้อง",
            },
            20001: {
                type: "Username / Password Invalid",
                message: "ชื่อผู้ใช้งาน หรือรหัสผ่านของคุณไม่ถูกต้อง",
            },
            20002: {
                type: "Force Logout",
                message: "เซสชั่นหมดอายุ กรุณาลงชื่อเข้าสู่ระบบอีกครั้ง",
            },
            20003: {
                type: "Force Update",
                message: "กรุณาอัปเดตเวอร์ชันของแอปพลิเคชัน",
            },
            20004: {
                type: "Error",
                message: "มีผู้ใช้นี้อยู่ในระบบแล้ว",
            },
            20005: {
                type: "Login Fail",
                message: "รหัสผ่านถูกล็อกเนื่องจากระบุรหัสผิดเกิน 10 ครั้ง กรุณาติดต่อเจ้าหน้าที่เพื่อทำการปลดล็อก",
            },
            20006: {
                type: "Password same as old password",
                message: "กรุณาเปลี่ยนรหัสผ่านไม่ให้ซ้ำกับรหัสผ่านเดิม",
            },
            20007: {
                type: "OTP code expired",
                message: "รหัสยืนยันตัวตนของคุณหมดอายุ กรุณากดส่งรหัสใหม่อีกครั้ง",
            },
            20008: {
                type: "Email / Phone Invalid",
                message: "ไม่พบอีเมล/เบอร์โทรศัพท์นี้ในระบบ กรุณาตรวจสอบข้อมูลอีกครั้ง",
            },
            20009: {
                type: "Phone number or email already exists in the system.",
                message: "เบอร์โทรศัพท์ หรือ อีเมลมีในระบบแล้ว",
            },

            20010: {
                type: "PIN Invalid",
                message: "รหัส PIN ของคุณไม่ถูกต้อง",
            },
            30001: {
                type: "Error - Insert/Update Data Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากข้อมูลไม่ครบถ้วน",
            },
            30002: {
                type: "Error - Insert/Update Data Limit",
                message: "ไม่สามารถทำรายการได้ เนื่องจากมีจำนวนรายการถึงขีดจำกัดแล้ว",
            },
            30003: {
                type: "Error - Upload File",
                message: "ไม่สามารถอัพโหลดไฟล์ได้",
            },
            30004: {
                type: "Error - Insufficient Balance",
                message: "ยอดเงินหรือทอง ไม่เพียงพอ",
            },
            30005: {
                type: "Error - Data Incorrect",
                message: "ไม่สามารถทำรายการได้ เนื่องจากคุณระบุข้อมูลไม่ถูกต้อง",
            },
            30006: {
                type: "Error - Phone Invalid",
                message: "เบอร์โทรศัพท์ที่ระบุไม่ตรงตามเงื่อนไข",
            },
            30007: {
                type: " Error - Insert/Update Data Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากวันที่และเวลาที่ระบุเป็นวันหยุดทำการ",
            },
            30008: {
                type: "Error - Appointed Time Invalid",
                message: "เวลาที่นัดรับที่ระบุไม่ตรงตามเงื่อนไข",
            },
            30009: {
                type: "Error - Not Enough",
                message: "ไม่สามารถทำรายการได้ เนื่องจากปริมาณที่สามารถซื้อขายได้ไม่พอ กรุณาลองใหม่อีกครั้ง",
            },
            30011: {
                type: "Error - Terms and Coditions Error",
                message: "ไม่สามารถทำรายการได้เนื่องจากข้อกำหนดและเงื่อนไขที่ถูกเลือกไม่ครบถ้วน",
            },
            30012: {
                type: "Error - Time Deposit Error",
                message: "ไม่สามารถทำรายการได้เนื่องจากอยู่ในช่วงห้ามโอนหรือก่อนห้ามโอน 10 นาที",
            },
            30013: {
                type: "Error - Deposit ATS Min Error",
                message: "เนื่องจากจำนวนเงินที่ฝากไม่ถึงยอดฝากขั้นต่ำ",
            },
            30014: {
                type: "Error - Money Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากยอดเงินเกินจำนวนสูงสุดที่ทำรายการได้",
            },
            30015: {
                type: "Error - Bank Account Max Error",
                message: "ไม่สามารถทำรายการได้ คุณสามารถเพิ่มบัญชีได้สูงสุด 5 บัญชีเท่านั้น",
            },
            30016: {
                type: "Error - Duplicate Bank Account Error",
                message: "ไม่สามารถทำรายการได้ คุณไม่สามารถทำรายการซ้ำกับข้อมูลที่มีอยู่",
            },
            30017: {
                type: " Error - Insert/Update Data Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากวันที่และเวลาที่ระบุเป็นช่วงนอกเวลาทำการ",
            },
            30018: {
                status: "ERROR",
                type: "Error - Insufficient Gold",
                message: "ไม่สามารถทำรายการได้ เนื่องจากจำนวนทองในระบบไม่เพียงพอต่อการถอน",
            },
            30019: {
                status: "ERROR",
                type: "Error - Withdraw Min or Max Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากจำนวนเงินที่ระบุไม่อยู่ในช่วงการถอน",
            },
            30020: {
                status: "ERROR",
                type: "Error - ID Card Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากไม่พบหมายเลขบัตรประชาชน",
            },
            30021: {
                status: "ERROR",
                type: "Error - Money in Wallet Not Enough",
                message: "ไม่สามารถทำรายการได้ จำนวนเงินในกระเป๋าของคุณ ไม่เพียงพอสำหรับการทำรายการ",
            },
            30022: {
                status: "ERROR",
                type: "Error- Payment KBANK Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากพบปัญหาเกี่ยวกับ KBANK",
            },
            30023: {
                type: "Error - ATS Account Max Error",
                message: "ไม่สามารถทำรายการได้ คุณสามารถผูกบัญชี ATS ได้สูงสุด 1 บัญชีเท่านั้น",
            },
            30024: {
                type: "Error - ATS, Your payment transaction has failed. Please contact KBank customer service.",
                message: "ไม่สามารถทำรายการชำระเงินได้ กรุณาติดต่อเจ้าหน้าที่ธนาคารเพื่อสอบถามข้อมูล",
            },
            30025: {
                type: "Error - ATS, Your payment transaction has failed due to insufficient balance.",
                message: "ยอดคงเหลือในบัญชีไม่พอทำรายการชำระเงิน",
            },
            30026: {
                status: "ERROR",
                type: "Error - Delete account management Error",
                message: "ไม่สามารถลบบัญชีที่มีรายการธุรกรรมได้",
            },
            30027: {
                status: "ERROR",
                type: "Error - Payment account Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากไม่พบบัญชีที่เป็น ATS",
            },
            30028: {
                status: "ERROR",
                type: "Error - Payment Error",
                message: "ไม่สามารถชำระค่าบริการได้",
            },
            30029: {
                status: "ERROR",
                type: "ERROR - Cash Amount In Account Management Not Enough",
                message: "ไม่สามารถทำรายการได้ เนื่องจากจำนวนเงินไม่พอ",
            },
            30030: {
                status: "ERROR",
                type: "ERROR - Email is valid",
                message: "ไม่สามารถทำรายการได้ เนื่องจากระบุอีเมลที่มีอยู่แล้วในระบบ",
            },
            30031: {
                status: "ERROR",
                type: "ERROR - Update cash amount error",
                message: "ไม่สามารถแก้ไขจำนวนเงินได้",
            },
            30032: {
                status: "ERROR",
                type: "ERROR - Update data transfer account error",
                message: "ไม่สามารถแก้ไขข้อมูลนี้ได้ สามารถแก้ไขข้อมูลได้เฉพาะข้อมูลล่าสุด",
            },
            30033: {
                status: "ERROR",
                type: "ERROR - Gold Amount Not Enough",
                message: "คุณไม่สามารถยกเลิกรายการซื้อทองได้ เนื่องจากทองในบัญชีของคุณไม่เพียงพอต่อการทำรายการ",
            },
            30034: {
                status: "ERROR",
                type: "ERROR - Cash Amount Not Enough",
                message: "คุณไม่สามารถยกเลิกรายการขายทองได้ เนื่องจากเงินในบัญชีหลักของคุณไม่เพียงพอต่อการทำรายการ",
            },
            30035: {
                status: "ERROR",
                type: "Error - Data Condition Incorrect",
                message: "ไม่สามารถทำรายการได้ เนื่องจากข้อมูลไม่อยู่ในเงื่อนไขที่สามารถแก้ไขได้",
            },
            30036: {
                status: "ERROR",
                type: "Error - Data In Transaction Incorrect",
                message: "ไม่สามารถทำรายการได้ เนื่องจากมีรายการไม่ตรงกับข้อมูลการเติมเงิน",
            },
            30037: {
                status: "ERROR",
                type: "Error - Amount in Transaction Incorrect",
                message: "ไม่สามารถทำรายการได้ เนื่องจากมีจำนวนเงินในรายการไม่ถูกต้อง",
            },
            30038: {
                status: "ERROR",
                type: "Error - Withdrawal amount must be more than the fee",
                message: "ไม่สามารถทำรายการได้ เนื่องจากจำนวนเงินที่ถอน ต้องมากกว่าค่าธรรมเนียม",
            },
            30039: {
                status: "ERROR",
                type: "Error - Affiliate Code Error",
                message: "ไม่สามารถทำรายการได้ เนื่องจากไม่พบรหัสแนะนำเพื่อน",
            },
            30040: {
                status: "ERROR",
                type: "Error - Affiliate Code Error",
                message: "ไม่สามารถทำรายการถอนได้ กรุณาติดต่อเจ้าหน้าที่ \n เบอร์โทร: 02-222-3600 \n E-Mail: support-gold2go@intergold.co.th",
            },
            30041: {
                status: "ERROR",
                type: "Error - Cannot to canceled",
                message: "ไม่สามารถยกเลิกได้ กรุณาตรวจสอบรายการอีกครั้ง",
            },
            30042: {
                status: "ERROR",
                type: "Error - Grid Validate",
                message: "จำนวนออเดอร์ต่อ Grid มากเกินกว่าที่ระบบกำหนด",
            },
            30043: {
                status: "ERROR",
                type: "Error - Grid Validate",
                message: "ไม่สามารถใช้ชื่อกลยุทธิ์ซ้ำกับที่มีอยู่ในระบบได้",
            },
            30044: {
                status: "ERROR",
                type: "Error - Grid Validate",
                message: "ไม่สามารถยืนยันได้ เนื่องจากราคาทองมีการเปลี่ยนแปลง กรุณาลองใหม่อีกครั้ง",
            },
            30045: {
                status: "ERROR",
                type: "Error - Trade Min Error",
                message: "มูลค่าทองตั้งซื้อขายต่อรายการต่ำกว่าขั้นต่ำที่กำหนด",
            },
            40001: {
                type: "Error - No Permission Access",
                message: "คุณไม่มีสิทธิ์ในการใช้งานฟังก์ชั่นนี้",
            },
            40002: {
                type: "Error - Must Enable 1 TwoFactor",
                message: "ไม่สามารถทำรายการได้ เนื่องจากต้องเปิดการยืนยันตัวตนอย่างน้อย 1 อย่าง",
            },
            40003: {
                type: "Error - Must Enable 1 Payment account",
                message: "ไม่สามารถทำรายการได้ กรุณาทำการผูกบัญชี",
            },
            50001: {
                type: "Error - Data Is Empty",
                message: "ไม่สามารถทำรายการได้ เนื่องจากไม่พบข้อมูล",
            },
            50002: {
                type: "Error - Closed Market",
                message: "ไม่สามารถทำรายการซื้อขายได้ในขณะนี้เนื่องจากตลาดปิด",
            },
            50003: {
                type: "Error - Closed System",
                message: "ไม่สามารถใช้งานระบบได้ในขณะที่เนื่องจากระบบปิด",
            },
            90000: {
                type: "Unknown error",
                message: "ขออภัย ระบบเกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
            },
        }
    }
    status(code) {
        return this.table[`${code}`] == undefined ? this.table["90000"] : this.table[`${code}`]
    }
    getCode(code) {
        return this.table[`${code}`] == undefined ? "90000" : code
    }
}
module.exports = RestResponse
