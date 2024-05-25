let usuariosController = require("../controllers/usuariosController")
let router = require("express").Router()

router.post("/", (req, res) => {
    usuariosController.login(req, res)
})

module.exports = router