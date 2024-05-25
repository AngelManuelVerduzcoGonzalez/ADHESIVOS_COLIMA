const jwt = require("jsonwebtoken");

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(400).send({
                message: "La sesión no es válida"
            })
        }
        try {
            const authHeader = req.headers.authorization
            const token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.userData = decoded
            next()
        } catch (err) {
            return res.status(400).send({
                message: "La sesión no es válida"
            })
        }
    }
}