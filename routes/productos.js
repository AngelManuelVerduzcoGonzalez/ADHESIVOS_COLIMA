let productosController = require("../controllers/productosController")
let usuariosMiddleware = require("../middleware/usuarios")
let router = require("express").Router()

router.get("/", usuariosMiddleware.isLoggedIn, (req, res, next) => {
    productosController.listar(req, res)
})

router.get("/:nombre", usuariosMiddleware.isLoggedIn, (req, res) => {
    productosController.buscar(req, res)
})

router.post("/", usuariosMiddleware.isLoggedIn, usuariosMiddleware.isAdmin, (req, res) => {
    productosController.agregar(req, res)
})

module.exports = router

