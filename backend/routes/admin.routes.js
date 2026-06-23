import express from 'express';
const router = express.Router();

// GET: muestra el formulario de login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST: verifica usuario y contraseña
router.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  if (usuario === 'admin' && contrasena === '1234') {
    req.session.isAdmin = true;
    return res.redirect('http://127.0.0.1:5500/tp-autoservicio-Buenaventura-Martina-Valentina-Torres/frontend/index.html');
  }

  res.render('login', { error: 'Usuario o contraseña incorrectos' });
});

export default router;