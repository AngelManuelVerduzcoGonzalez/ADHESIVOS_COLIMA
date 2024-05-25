let productosController = require("../controllers/productosController")
let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.get("/", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    productosController.mostrarProductos(req, res)
})

module.exports = router