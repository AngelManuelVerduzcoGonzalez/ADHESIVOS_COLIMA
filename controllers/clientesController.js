const db = require('../lib/db.js')

module.exports = {
    listar: (req, res) => {
        db.query(
            'SELECT * FROM clientes', //HACER UN JOIN PARA MOSTRAR EL NOMBRE DE USUARIO
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else
                    res.json(rows)
            }
        ) 
    }
}