const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const helmet = require("helmet")
const uuid = require("uuid")
// Routes
const apiRoutes = require("./src/routes/api")
const dayjs = require("dayjs")

app.use(
    bodyParser.urlencoded({
        parameterLimit: 100,
        extended: false,
        limit: "1024mb",
    })
)
/* A middleware that parses the body of the request. */
app.use(bodyParser.json({ limit: "1024mb" }))
/* A middleware that allows cross-origin requests. */
app.use(require("cors")({ origin: "*" }))
/* A middleware that helps secure Express apps by setting various HTTP headers. */
app.use(helmet())


// Custom middleware to intercept all requests
app.use((req, res, next) => {
    // Modify the response body or perform any other actions
    console.log(`Intercepted request: ${req.method} ${req.url}`)
    req.headers["X-Request-Id"] = uuid.v4()
    req.headers["X-Request-At"] = dayjs().valueOf()
    next()
})

app.use((req, res, next) => {
    // Override the json function
    const originalJson = res.send

   
    res.send = function (data) {
        console.log(`Intercepted reponse: ${req.method} ${req.url}`)
        console.log(arguments[0])
        res.setHeader("X-Response-At", dayjs().valueOf())


        originalJson.apply(res, arguments)
    }
    next()
})

app.use("/api", apiRoutes)
app.get("/", (req, res) => {
    res.send("API running")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
