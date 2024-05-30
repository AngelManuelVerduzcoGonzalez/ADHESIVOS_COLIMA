const db = require('../lib/db.js');
const jwt = require('jsonwebtoken');

module.exports = {
    crear: (req, res) => {
        let total = 0;
        let facturaId;
        let idUsuario = ""

        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).send('Token no proporcionado.');
        }
        jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send('Token no válido.');
            }
            idUsuario = decoded.usuarioId
            //console.log(idUsuario)
            req.user = decoded; // Adjunta datos decodificados del usuario a la solicitud
        });

        // Inicia una transacción
        db.beginTransaction((err) => {
            if (err) {
                res.status(500).json({ error: 'Error al iniciar la transacción' });
                return;
            }

            // Consulta los precios de los productos y calcula el precio total
            let productosProcesados = 0;
            for (let producto of req.body.productos) {
                db.query(
                    'SELECT precio FROM productos WHERE nombre = ? FOR UPDATE',
                    [producto.nombre],
                    (err, results) => {
                        if (err) {
                            return db.rollback(() => {
                                res.json(err);
                            });
                        }
                        if (results.length > 0) {
                            const precio = results[0].precio;
                            total += precio * producto.cantidad;
                        }
                        productosProcesados++;

                        if (productosProcesados === req.body.productos.length) {
                            // Todas las consultas de productos han sido procesadas
                            // Consulta el ID del cliente
                            db.query(
                                'SELECT id FROM clientes WHERE idUser = ? FOR UPDATE',
                                [idUsuario],
                                (err, results) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            res.json(err);
                                        });
                                    }
                                    if (results.length > 0) {
                                        const idCliente = results[0].id;

                                        // Inserta la factura en la base de datos
                                        db.query(
                                            'INSERT INTO facturas (fecha, total, idCliente) VALUES (?, ?, ?)',
                                            [req.body.fecha, total, idCliente],
                                            (err, results) => {
                                                if (err) {
                                                    return db.rollback(() => {
                                                        res.json(err);
                                                    });
                                                }
                                                facturaId = results.insertId;

                                                // Inserta los productos de la factura en la tabla intermedia
                                                let productosInsertados = 0;
                                                for (let producto of req.body.productos) {
                                                    db.query(
                                                        'SELECT id FROM productos WHERE nombre = ? FOR UPDATE',
                                                        [producto.nombre],
                                                        (err, results) => {
                                                            if (err) {
                                                                return db.rollback(() => {
                                                                    res.json(err);
                                                                });
                                                            }
                                                            if (results.length > 0) {
                                                                const idProducto = results[0].id;

                                                                // Inserta el producto en la tabla intermedia
                                                                db.query(
                                                                    'INSERT INTO productos_factura (idproducto, idfactura, cantidad) VALUES (?, ?, ?)',
                                                                    [idProducto, facturaId, producto.cantidad],
                                                                    (err, results) => {
                                                                        if (err) {
                                                                            return db.rollback(() => {
                                                                                res.json(err);
                                                                            });
                                                                        }
                                                                        productosInsertados++;

                                                                        // Si se han insertado todos los productos, confirma la transacción
                                                                        if (productosInsertados === req.body.productos.length) {
                                                                            db.commit((err) => {
                                                                                if (err) {
                                                                                    return db.rollback(() => {
                                                                                        res.json(err);
                                                                                    });
                                                                                }
                                                                                res.json({ mensaje: 'Factura creada exitosamente' });
                                                                            });
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    } else {
                                        return db.rollback(() => {
                                            res.json({ error: 'No se encontró un cliente con el ID proporcionado' });
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    },
    listar: (req, res) => {
        let idUsuario = ""

        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).send('Token no proporcionado.');
        }
        jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send('Token no válido.');
            }
            idUsuario = decoded.usuarioId
            console.log(idUsuario)
            //console.log(idUsuario)
            req.user = decoded; // Adjunta datos decodificados del usuario a la solicitud
        });

        db.query(
            'SELECT id from clientes WHERE idUser = ?;',
            [idUsuario],
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else{
                    const idCliente = rows[0].id
                    db.query(
                        `CALL facturasPorCliente(?)`,
                        [idCliente],
                        (err, rows, fields) => {
                            if(err)
                                res.json(err)
                            else
                                res.json(rows)
                        }
                    )
                }
            }   
        )
    }
};
