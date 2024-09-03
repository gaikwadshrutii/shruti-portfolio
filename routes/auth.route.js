const { registerUser, loginUser, logoutUser } = require("../controllers/auth.controller")

const router = require("express").Router()

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)

module.exports = router
