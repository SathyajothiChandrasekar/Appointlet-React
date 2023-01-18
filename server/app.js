const express = require('express')
const logins = require("./routes/logins")
const events = require("./routes/events")
const bookings = require("./routes/bookings")
const app = express()
const AWS = require("aws-sdk");
//middleware
app.use(express.static("./public"))
app.use(express.json())

const port = 5000;
const start = async() => {
    try {
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } catch (error) {
         console.log(error);
    }
}

start();

app.use("/dynamo/v1/logins", logins)
app.use("/dynamo/v1/events", events)
app.use("/dynamo/v1/bookings", bookings)