let clientesController = require("../controllers/clientesController")
let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.get("/", usuariosMiddleware.isLoggedIn, usuariosMiddleware.isAdmin, (req, res, next) => {
    clientesController.listar(req, res)
})

module.exports = router