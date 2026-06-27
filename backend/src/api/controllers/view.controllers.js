/* =============================================
controladores de vista
============================================= */
import { join, __dirname } from "../utils/index.js";
import productModels from "../models/product.models.js";

//vista principal
export const indexView = async (req, res) => {
    try {
        const [rows] = await productModels.selectAllProducts();
        res.render("index", { 
            title: "Dashboard", 
            link_estilos: "/css/styles.css",
            about: "Nuestros Productos",
        productsArray: rows });
    } catch (error) {
        console.log("Error al obtener los productos:", error.message);

        res.status(500).json({
            message: "Error interno obteniendo la informacion"
        });
    }  
}

// vista obtener producto
export const getProducView = (req, res) => {
    res.render("get",
        { title: "consultar",
            link_estilos: "/css/styles.css",
            about: "obtener producto por id: "
        });
}

// vista crear producto
export const createPorductView = (req, res) => {
    res.render("post",
        { title: "crear",
            link_estilos: "/css/styles.css",
        about: "crear producto"
        });
}

// vista act producto
export const updateProductView = (req, res) => {
    res.render("put", {
        title: "modificar",
        link_estilos: "/css/styles.css",
        about: "consultar producto por id: "});
}

// vista eliminar producto 
export const deleteProductView = (req, res) => {
    res.render("delete", {
        title: "eliminar",
        link_estilos: "/css/styles.css",
        about: "consultar producto por id: "
    })
}
