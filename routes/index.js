let router = require("express").Router()

signUp = require("./signUp.js")
login = require("./login.js")
productos = require("./productos.js")

router.use("/sign-up", signUp)
router.use("/login", login)
router.use("/productos", productos)

module.exports = router