const db = require('../lib/db.js')

module.exports = {
    listar: (req, res) => {
        db.query(
            'SELECT * FROM productos',
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else
                    res.json(rows)
            }
        ) 
    },
    buscar: (req, res) => {
        db.query(
            'SELECT * FROM productos where nombre like ?;',
            [`${req.params.nombre}%`],
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else
                    res.json(rows)
            }
        )
    },
    agregar: (req, res) => {
        db.query(
            'INSERT INTO productos (nombre, precio, cantidad) VALUES (?, ?, ?);',
            [req.body.nombre, req.body.precio, req.body.cantidad],
            (err, rows, fields) => {
                if (err) {
                    res.json(err)
                }
                else {
                    res.json(rows)
                }
            }
        )    
    }
}