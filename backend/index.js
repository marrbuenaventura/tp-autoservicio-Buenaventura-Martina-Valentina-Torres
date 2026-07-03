import express from "express"
import cors from "cors"
import session from "express-session" // Middleware para manejar sesiones de usuario
import environments from "./src/api/config/environments.js";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import {join, __dirname} from "./src/api/utils/index.js";
import {viewRoutes, productRoutes, adminroutes, ventaRoutes, userRoutes} from "./src/api/routes/index.js";

const app = express()
// Extraemos con el destructuring las variables port y session_key
const { port, session_key } = environments;
const PORT = port;

// ===== MIDDLEWARES GLOBALES =====
app.use(cors())   // Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use(express.json()) // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true })) // Middleware para parsear el cuerpo de las solicitudes con URL-encoded (formulario)
app.use(loggerURL); // Middleware personalizado para loguear las URLs de las peticiones
app.use(express.static(join(__dirname, "src/public"))); // Middleware para servir archivos estaticos del admin (CSS, JS, imágenes)

app.use(session({
  secret: session_key,
  resave: false,
  saveUninitialized: false 
}));

// configuramos ejs como motor de plantillas para renderizar vistas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", adminroutes);
app.use("/cliente", express.static(join(__dirname, "../frontend/cliente")));
app.use("/css", express.static(join(__dirname, "../frontend/css")));
app.use("/js", express.static(join(__dirname, "../frontend/js")));
app.use("/api/users", userRoutes); // rutas de usuarios

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})