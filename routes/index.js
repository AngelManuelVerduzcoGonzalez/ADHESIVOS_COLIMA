let router = require("express").Router()

const signUp = require("./signUp.js")
const login = require("./login.js")
const productos = require("./productos.js")
const clientes = require("./clientes.js")

router.use("/sign-up", signUp)
router.use("/login", login)
router.use("/productos", productos)
router.use("/clientes", clientes)

module.exports = router