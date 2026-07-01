// archivo barril, une los dos archivos product y view routes

import productRoutes from "./product.routes.js";
import viewRoutes from "./view.routes.js";
import adminroutes from "./admin.routes.js";
import ventaRoutes from "./venta.routes.js";
import userRoutes from "./user.routes.js";

export {
    productRoutes,
    viewRoutes,
    adminroutes,
    ventaRoutes,
    userRoutes
}