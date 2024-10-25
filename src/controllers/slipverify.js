const { isEmpty } = require("class-validator")
const Encryption = require("../modules/encrypt")
const LoggingStep = require("../modules/logging")
const RestResponse = require("../modules/response")
const Helper = require("../modules/helper")
const dayjs = require("dayjs")
const https = require('https');
const TOKEN = process.env.TOKEN_LINE
module.exports.slipVerify = async (req, res) => {
    
    console.log(req.body)

    // {
    //     destination: 'Ud15d0d264011829d628e5e63cd76011c',
    //     events: [
    //       {
    //         type: 'message',
    //         message: [Object],
    //         webhookEventId: '01JB1KYKS34FEKZZB6JS239TVH',
    //         deliveryContext: [Object],
    //         timestamp: 1729852558632,
    //         source: [Object],
    //         replyToken: 'd2ddcc11dcc94edd9b28dc43e5bd7bf7',
    //         mode: 'active'
    //       }
    //     ]
    //   }


   // If the user sends a message to your bot, send a reply message

    if(!isEmpty(req.body['events'])){
        if (req.body.events[0].type === "message") {

            console.log(req.body.events[0].source)
            // You must stringify reply token and message data to send to the API server
            const dataString = JSON.stringify({
                // Define reply token
                replyToken: req.body.events[0].replyToken,
                // Define reply messages
                messages: [
                    {
                        type: "text",
                        text: "Hello, user",
                    },
                    {
                        type: "text",
                        text: "May I help you?",
                    },
                ],
            })
    
            // Request header. See Messaging API reference for specification
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + TOKEN,
            }
    
            // Options to pass into the request, as defined in the http.request method in the Node.js documentation
            const webhookOptions = {
                hostname: "api.line.me",
                path: "/v2/bot/message/reply",
                method: "POST",
                headers: headers,
                body: dataString,
            }
    
            // When an HTTP POST request of message type is sent to the /webhook endpoint,
            // we send an HTTP POST request to https://api.line.me/v2/bot/message/reply
            // that is defined in the webhookOptions variable.
    
            // Define our request
            const request = https.request(webhookOptions, (res) => {
                res.on("data", (d) => {
                    process.stdout.write(d)
                })
            })
    
            // Handle error
            // request.on() is a function that is called back if an error occurs
            // while sending a request to the API server.
            request.on("error", (err) => {
                console.error(err)
            })
    
            // Finally send the request and the data we defined
            request.write(dataString)
            request.end()
        }
    }

    res.sendStatus(200)
  
}
