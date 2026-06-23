# tp-autoservicio-Buenaventura-Martina-Valentina-Torres
Sistema de autoservicio para venta de ropa deportiva. Proyecto integrador de Programación III — UTN Avellaneda. 

## Descripción

Aplicación full-stack que permite a los clientes navegar un catálogo de productos (zapatillas y ropa deportiva), agregarlos a un carrito y simular una compra. Incluye además un panel de administración protegido por login para gestionar el catálogo.

## Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** MySQL (driver `mysql2`)
- **Motor de vistas:** EJS (panel admin del lado del backend)
- **Variables de entorno:** dotenv
- **Frontend (cliente):** HTML, CSS y JavaScript vanilla (sin frameworks)
- **Arquitectura:** Router → Controller → Model

## Estructura del proyecto

```
tp-autoservicio/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── public/
│   │   └── img/
│   ├── routes/
│   ├── src/
│   │   └── api/
│   │       ├── config/
│   │       ├── database/
│   │       └── middlewares/
│   └── views/
└── frontend/
    ├── assets/
    │   └── img/
    ├── cliente/
    ├── css/
    └── js/
```

## Para usar: 

```bash
git clone <url-del-repo>
cd tp-autoservicio
npm install
```

Configurar la base de datos MySQL y las variables de conexión (host, usuario, contraseña, nombre de base) según corresponda.

1. Levantar el servidor backend:
   ```bash
   node index.js
   ```
2. Abrir `bienvenida.html` para ingresar como cliente.
3. Acceder al panel de administración (servido por el backend desde `views/` con EJS), con usuario `admin` y contraseña `1234`.

## Funcionalidades

- Pantalla de bienvenida con ingreso de nombre
- Catálogo de productos dividido en Zapatillas y Ropa
- Carrito de compras con contador, modificación de cantidades y total
- Login de administrador con verificación de credenciales
- Panel de administración para gestión de productos (CRUD)

## Alumnas:
- Buenaventura, Martina
- Torres, Valentina