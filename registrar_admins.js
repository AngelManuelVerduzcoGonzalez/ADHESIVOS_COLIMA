const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

const registerUser = async (nombreUsuario, contrasena) => {
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        db.query(
            'INSERT INTO usuarios (nombreUsuario, contrasena, tipo) VALUES (?, ?, ?);',
            [nombreUsuario, hashedPassword, "administrador"],
            (err, result) => {
                if (err) {
                    console.error('Error al insertar usuario:', err);
                    return;
                }
                console.log('Usuario registrado exitosamente:', result);
            }
        );
    } catch (err) {
        console.error('Error al registrar usuario:', err);
    }
};

// Ejemplo de uso del script
const nombreUsuario = 'Hanzeel';
const contrasena = '1234';

registerUser(nombreUsuario, contrasena);
