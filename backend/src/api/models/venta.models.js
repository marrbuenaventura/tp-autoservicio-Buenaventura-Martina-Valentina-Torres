import connection from '../database/db.js';

// Crea el "encabezado" de la venta y devuelve el id generado
const insertVenta = async (usuario, total) => {
    const sql = 'INSERT INTO ventas (usuario, total) VALUES (?, ?)';
    const [result] = await connection.query(sql, [usuario, total]);
    return result.insertId; // MySQL devuelve el id que le asignó automáticamente
};

// Crea una fila en la tabla intermedia, conectando la venta con un producto
const insertVentaProducto = async (ventaId, productId, cantidad, precioUnitario) => {
    const sql = 'INSERT INTO ventas_productos (venta_id, product_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
    return connection.query(sql, [ventaId, productId, cantidad, precioUnitario]);
};

export default {
    insertVenta,
    insertVentaProducto
};