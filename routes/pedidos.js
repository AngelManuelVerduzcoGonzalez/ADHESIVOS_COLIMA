let pedidosController = require("../controllers/pedidosController")
let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.post("/", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    pedidosController.crear(req, res)
})

module.exports = router