/*================================
    Modelo de usuario
================================*/
import connection from "../database/db.js";

// Inserta un nuevo usuario administrador en la base de datos
const insertUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}
// Busca un usuario por su email
const selectUserByEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return connection.query(sql, [email]);
}

export default {
    insertUser,
    selectUserByEmail
}