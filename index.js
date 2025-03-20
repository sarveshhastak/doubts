const express = require("express")  //to start server
const mongoose = require("mongoose")  //to connect to database
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { protectedRoute } = require("./middleware/auth.middleware")
require("dotenv").config()  //to access PORT number from .env
const app = express() //to start server
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/todo", require("./routes/todo.route"))
app.use("/api/blog", protectedRoute, require("./routes/blog.route"))
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found !" })
})
mongoose.connect(process.env.MONGO_URL) //to connect to database
mongoose.connection.once("open", () => {
    console.log("MONGODB CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING...", process.env.PORT))    //to start server
})