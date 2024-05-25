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
            'SELECT * FROM productos where nombre = ?;',
            [req.params.nombre],
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else
                    res.json(rows)
            }
        )
    }
}