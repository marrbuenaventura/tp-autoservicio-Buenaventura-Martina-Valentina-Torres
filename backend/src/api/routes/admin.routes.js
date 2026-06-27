import { Router } from 'express';
import { adminLoginView, processLoginInfo, destroyLogin} from '../controllers/admin.controllers.js';
const router = Router();

// vista login admin
router.get("/", adminLoginView);

// endpoint para recibir la info del form del login 

// POST: verifica usuario y contraseña
router.post('/', processLoginInfo);

//POST: cierra sesion
router.post("/destroy", destroyLogin);

export default router;