/// la lógica de cada cosa. Por ejemplo el de productos tiene las funciones de listar, agregar, editar, eliminar
/*================================
    Controladores de producto
================================*/

import ProductModels from "../models/product.models.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const [rows, fields] = await ProductModels.selectAllProducts();
        //En caso de no haber productos, devolvemos un 404
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
        res.status(200).json({
            payload: rows,
            total: rows.length // tambien enviamos el total de productos
        });

    } catch (error) {
        console.log("Error obteniendo los productos: ", error);
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

// Get products by id
export const getProductById = async (req, res) => {
    try {
        //Delegamos al middleware validateId recoger el valor y limpiarlo
        const [rows] = await ProductModels.selectProductById(req.id);   
        //Devolveremos un codigo de estado 404 (Not Found) si no existe ningun producto con ese id
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${req.id}`
            });
        }
        res.status(200).json({ payload: rows[0] });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${req.id}`, error.message);
        res.status(500).json({
            message: `Error interno al obtener un producto con id ${req.id}`
        });
    }
}

// Create new product
export const createProduct = async (req, res) => {
    try {
        // Gracias al middleware router.use(express.json()); recibo el JSON como objeto JS al que le puedo aplicar el siguiente destrucuring
        console.log(req.body);
        // Recogemos los datos limpios del body
        const { name, image, category, price } = req.body;
        const [rows] = await ProductModels.insertNewProduct(name, image, category, price);
    
        //En lugar de 201, devolvemos un 201 "Created"
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

// Modify product
export const modifyProduct = async (req, res) => {
    try {
        const { name, image, price, category, active } = req.body
        const id = req.id

        if (!name || !image || !price || !category) {
            return res.status(400).json({
                message: "Todos los campos del formulario son requeridos"
            })
        }

        const [result] = await ProductModels.updateProduct(name, image, price, category, active, id)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el producto"
            })
        }

        return res.status(200).json({
            message: "Producto actualizado correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

// Delete product
export const removeProduct = async (req, res) => {
    try {
        // Reaprovechamos el middleware de ruta validateId (op2)
        await ProductModels.deleteProduct(req.id);
        // la convencion REST habria que devolver para un DELETE exitoso, un codigo 204 No Content
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log(`Error en peticion DELETE`, error);
        res.status(500).json({
            message : "Error interno del servidor"
        });
    }
}