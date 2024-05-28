const db = require('../lib/db.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        db.query(
            'SELECT * FROM usuarios WHERE nombreUsuario = ?;',
            [req.body.nombreUsuario],
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: err,
                    })
                }
                if (!result.length) {
                    return res.status(400).send({
                        message: "Nombre de usuario o contraseña incorrectos"
                    })
                }

                bcrypt.compare(
                    req.body.contrasena,
                    result[0]['contrasena'],
                    (bErr, bResult) => {
                        if (bErr) {
                            console.log('Error de bcrypt.compare:', bErr)
                            return res.status(400).send({
                                message: "Nombre de usuario o contraseña incorrectos"
                            })
                        }
                        if (bResult) {
                            //Contraseña correcta
                            const token = jwt.sign(
                                {
                                    //PAYLOAD
                                    nombreUsuario: result[0].nombreUsuario,
                                    usuarioId: result[0].id, //id es una columna de la BD
                                    tipo: result[0].tipo
                                },
                                process.env.SECRET_KEY,
                                {expiresIn: '7d'}
                            )
                            return res.status(200).send({
                                message: 'Sesión iniciada',
                                token: token,
                                tipo: result[0].tipo
                            })
                        }
                        return res.status(400).send({
                                message: "Nombre de usuario o contraseña incorrectos"
                        })
                    }
                )
            }
        )
    }
}