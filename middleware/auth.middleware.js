const jwt = require("jsonwebtoken")
exports.protectedRoute = (req, res, next) => {
    try {
        // const isLoggedIn = false
        // if (isLoggedIn) {
        //     next()
        // } else {
        //     res.status(401).json({ message: "Please Login" })
        // }

        const token = req.cookies.USER
        if (!token) {
            return res.status(401).json({ message: "No Cookie Found !" })
        }


        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token !" })
            }
            req.user = data._id   //👈id of loggedin user
            next()
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}