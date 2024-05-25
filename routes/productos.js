let productosController = require("../controllers/productosController")
let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.get("/", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    productosController.listar(req, res)
})

router.get("/:nombre", (req, res) => {
    productosController.buscar(req, res)
})

module.exports = router