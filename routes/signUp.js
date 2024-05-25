let signUpController = require("../controllers/signUpController")
let clientesMiddleware = require('../middleware/clientes')

let router = require("express").Router()

router.post('/', clientesMiddleware.validateSignUp, (req, res, next) => {
    signUpController.signUp(req, res)
}) 


module.exports = router