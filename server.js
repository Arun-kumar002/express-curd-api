const express = require("express")
const cors = require("cors")
const {connect} = require("mongoose")
const employeeRoute = require("./routes/employee")
const fs = require("fs")

let app = express()
app.use(cors())
// body parser middleware
app.use(express.json())

// connect data base
connect("mongodb://localhost:27017/emp-api", (err) => {
    if(err) throw err
    console.log("db connected")
})  


app.use("/api", employeeRoute)

app.listen(5000, err => {
    if (err) throw err;
    console.log("app is running on port number 5000")
})