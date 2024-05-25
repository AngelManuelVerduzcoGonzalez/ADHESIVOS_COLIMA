const db = require('../lib/db.js')

module.exports = {
    mostrarProductos: (req, res) => {
        db.query(
            'SELECT * FROM productos',
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else
                    res.json(rows)
            }
        ) 
    }
}