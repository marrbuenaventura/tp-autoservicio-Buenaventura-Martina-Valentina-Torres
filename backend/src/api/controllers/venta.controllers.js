import VentaModels from '../models/venta.models.js';

export const createVenta = async (req, res) => {
    try {
        // El frontend nos manda: usuario, total y un array de productos
        const { usuario, total, productos } = req.body;

        // Validamos que llegue lo mínimo necesario
        if (!usuario || !total || !productos || productos.length === 0) {
            return res.status(400).json({
                message: "Faltan datos para registrar la venta"
            });
        }

        // 1. Creamos el encabezado de la venta y guardamos el id que nos devuelve
        const ventaId = await VentaModels.insertVenta(usuario, total);

        // 2. Por cada producto del carrito, insertamos su detalle en ventas_productos
        for (const producto of productos) {
            await VentaModels.insertVentaProducto(
                ventaId,
                producto.id,
                producto.cantidad,
                producto.precio
            );
        }

        // 3. Si todo salió bien, respondemos con éxito
        res.status(201).json({
            message: "Venta registrada con éxito",
            ventaId: ventaId
        });

    } catch (error) {
        console.log("Error al registrar la venta:", error);
        res.status(500).json({
            message: "Error interno al registrar la venta"
        });
    }
};