/* models de usuario */ 

import connection from "../database/db.js";

const insertAdminUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}

export default {
    insertAdminUser
}