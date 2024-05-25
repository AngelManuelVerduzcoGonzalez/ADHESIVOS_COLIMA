const db = require('../lib/db.js');
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: (req, res) => {
        db.query(
            'SELECT rfc FROM clientes WHERE lower(rfc) = lower(?);',
            [req.body.rfc],
            (err, result) => {
                if (result && result.length) {
                    return res.status(409).send({
                        message: 'El RFC ya está en uso',
                    });
                } else {
                    // Verificar si el nombreUsuario ya está en uso
                    db.query(
                        'SELECT nombreUsuario FROM usuarios WHERE lower(nombreUsuario) = lower(?);',
                        [req.body.nombreUsuario],
                        (err, result) => {
                            if (result && result.length) {
                                return res.status(409).send({
                                    message: 'El nombre de usuario ya está en uso',
                                });
                            } else {
                                // nombreUsuario no en uso, proceder con el registro
                                bcrypt.hash(req.body.contrasena, 10, (err, hash) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: err,
                                        });
                                    } else {
                                        db.query(
                                            'CALL agregar_cliente(?, ?, ?, ?, ?, ?, ?)', 
                                            [req.body.nombreUsuario, hash, req.body.rfc, req.body.celular, req.body.calle, req.body.numero, req.body.codigopostal],
                                            (err, result) => {
                                                if (err) {
                                                    return res.status(400).send({
                                                        message: err,
                                                    });
                                                } else {
                                                    return res.status(201).send({
                                                        message: 'Registrado',
                                                    });
                                                }
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    );
                }
            }
        );
    }
};
