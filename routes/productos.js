let productosController = require("../controllers/productosController")
let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.get("/", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    productosController.listar(req, res)
})

router.get("/:nombre", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    productosController.buscar(req, res)
})

router.post("/", usuariosMiddleware.isAdmin, (req, res, next) => {
    productosController.agregar(req, res)
})

router.put("/", usuariosMiddleware.isAdmin, (req, res, next) => {
    productosController.actualizar(req, res)
})

module.exports = router