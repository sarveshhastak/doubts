exports.sendSms = ({ numbers, message }) => new Promise((resolve, reject) => {
    var unirest = require("unirest");

    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    req.query({
        "authorization": process.env.SMS_KEY,
        message,
        "language": "english",
        "route": "q",
        numbers,
    });

    req.headers({
        "cache-control": "no-cache"
    });


    req.end(function (res) {
        if (res.error) {
            console.log(res.error);
            reject(res.error)
            // throw new Error(res.error);
        } else {
            console.log("SMS SEND");
            resolve()
        }


    });

})