import { Router } from 'express';
import { createVenta } from '../controllers/venta.controllers.js';

const router = Router();

// POST: registra una nueva venta
router.post("/", createVenta);

export default router;