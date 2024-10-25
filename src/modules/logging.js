const dayjs = require("dayjs")

class LoggingStep {
    loggingStep = []
    constructor() {}

    set(text) {
        let message = `${dayjs().format("YYYY-MM-DD HH:mm:ss")} : ${text}`
        console.log(new Date(), text)
        this.loggingStep.push(message)
    }
    get() {
        return this.loggingStep
    }
    multi(array) {
        this.loggingStep = [...this.loggingStep, ...array]
    }
    clean() {
        this.loggingStep.length = 0
    }

    createLoging() {
        const data = {
            // created_at: new Date(),
            // service_name: serviceName,
            // service_describe: "SMS REQUEST",
            // service_status: "",
            // raw_headers: req.headers,
            // raw_request: req.body,
            // raw_response: "",
            // raw_detail: "",
            // reponse_date: "",
            // user_agent: req.get("User-Agent"),
            // user_ip: requestIp.getClientIp(req),
            // request_url: req.url,
            // auth_id: req.authId,
            // ref_uuid: req.refId,
            // step: [],
            // config_uuid: "",
            // time_proccess: "",
            // config: {},
            // cmp_id: "",
            // branch_id: "",
            // user_id: "",
        }
    }
}

module.exports = LoggingStep
