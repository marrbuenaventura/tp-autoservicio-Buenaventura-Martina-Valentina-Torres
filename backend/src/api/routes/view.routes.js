/* =============================
RUTAS DE VISTAS 
============================= */
import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { indexView, createPorductView, deleteProductView, updateProductView, getProducView} from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

// vista principal admin
router.get("/index", indexView); // agregar requireLogin pero no tenemos las cosas todavia asiq desp

//vista obtener producto
router.get("/consultar", requireLogin, getProducView);

//vista crear producto
router.get("/crear", requireLogin, createPorductView);

// vista modificar producto
router.get("/modificar", requireLogin, updateProductView);

// vista eliminar producto 
router.get("/eliminar", requireLogin, deleteProductView);

export default router;