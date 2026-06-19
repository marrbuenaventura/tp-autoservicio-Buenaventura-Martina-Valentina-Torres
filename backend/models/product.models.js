/// las "tablas" de la base de datos pero en código. Un archivo por tabla (Producto, Usuario, Venta, VentaProducto)

/*==============================================
Modelos de producto
==============================================*/

import connection from '../src/api/database/db.js';

////////////////////////////////////////
// traer todos los productos
const selectAllProducts = () => {
    const sql = 'SELECT * FROM products';
    return connection.query(sql);
};

////////////////////////////////////////
// traer un producto por id
const selectProductById = (id) => {
    const sql = 'SELECT * FROM products WHERE products.id = ?';
    return connection.query(sql, [id]);
};

////////////////////////////////////////
// crear un nuevo producto
const insertNewProduct = (name, image, category, price) => {
    const sql = 'INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)';
    return connection.query(sql, [name, image, category, price]);
};

////////////////////////////////////////
// actualizar un producto existente
const updateProduct = (name, image, price, category, id) => {
    const sql = 'UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?';
    return connection.query(sql, [name, image, price, category, id]);
};

////////////////////////////////////////
// eliminar un producto
const deleteProduct = (id) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    return connection.query(sql, [id]);
};

// Exportamos todo junto como un objeto default, para que el controller pueda usar ProductModels.selectAllProducts(), etc.
export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct
};