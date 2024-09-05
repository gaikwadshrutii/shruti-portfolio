
const jwt = require("jsonwebtoken")
exports.userProteced = (req, res, next) => {
    const user = req.cookies.user
    console.log(req.cookies)

    if (!user) {
        if (!user) {
            return res.status(401).json({ message: "No Cookie Found" })
        }
    }
    jwt.verify(user, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "JWT Error", error: err.message })
        }
        req.loggedInUser = decode.userId
        next()
    })

}
exports.adminProteced = (req, res, next) => {
    const admin = req.cookies.admin
    if (!admin) {
        if (!admin) {
            return res.status(401).json({ message: "No Cookie Found", error: err.message })
        }
    }
    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "JWT Error", error: err.message })
        }
        req.loggedInUser = decode.userId
        next()
    })

}