let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.get("/", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    res.json({message: "JALA ALV"})
})

module.exports = router