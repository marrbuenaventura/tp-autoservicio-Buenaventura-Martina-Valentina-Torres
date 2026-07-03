# TP Autoservicio - Buenaventura Martina & Torres Valentina

Sistema de autoservicio para la venta de ropa deportiva desarrollado como Proyecto Integrador de Programación III - UTN Facultad Regional Avellaneda.

## Descripción

Aplicación full-stack que permite a los clientes navegar un catálogo de productos deportivos, agregarlos a un carrito y simular una compra.

Además, cuenta con un panel de administración protegido mediante autenticación por sesiones, desde el cual es posible gestionar el catálogo realizando operaciones CRUD.

El backend expone una API REST desarrollada con Express y conectada a una base de datos MySQL, mientras que el panel de administración utiliza EJS como motor de vistas.

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express.js
- MySQL (mysql2)
- EJS
- express-session
- bcrypt
- dotenv
- cors

### Frontend

- HTML5
- CSS3
- JavaScript

### Arquitectura

- API REST
- Patrón MVC (Router → Controller → Model)

---

## Arquitectura del proyecto

El proyecto sigue el patrón MVC para separar responsabilidades.

- **Router:** recibe las peticiones HTTP y las dirige al controlador correspondiente.
- **Controller:** contiene la lógica de negocio, valida la información y prepara la respuesta.
- **Model:** realiza las consultas a la base de datos.
- **View (EJS):** renderiza las vistas dinámicas del panel de administración.

---

## Estructura del proyecto

```text
tp-autoservicio/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── public/
│   ├── src/
│   │   └── api/
│   │       ├── config/
│   │       ├── database/
│   │       └── middlewares/
│   ├── views/
│   └── index.js
│
└── frontend/
    ├── assets/
    ├── cliente/
    ├── css/
    └── js/
```

---

## Funcionalidades

### Cliente

- Pantalla de bienvenida.
- Catálogo de productos.
- Carrito de compras.
- Modificación de cantidades.
- Cálculo automático del total.

### Administrador

- Inicio de sesión.
- Panel de administración con EJS.
- Alta de productos.
- Modificación de productos.
- Eliminación de productos.
- Visualización del catálogo.

---

## Dependencias principales

- express
- mysql2
- ejs
- express-session
- bcrypt
- cors
- dotenv
- nodemon

---

## Autoras

- Buenaventura Martina
- Torres Valentina