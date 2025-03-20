// const { register } = require("../controllers/auth.controller")
const auth = require("../controllers/auth.controller")
const { protectedRoute } = require("../middleware/auth.middleware")

const router = require("express").Router()
router
    // .post("/register", register)
    .post("/register", auth.register)
    .post("/login", auth.login)
    .post("/oauth", auth.loginWithGoogle)
    .post("/send-otp", auth.sendOtp)
    .post("/logout", auth.logout)
    .get("/get-users", protectedRoute, auth.allUsers)
module.exports = router