import express from "express"
const app = express()
import cors from "cors"
import session from "express-session" // Middleware para manejar sesiones de usuario
import environments from "./src/api/config/environments.js";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import {join, __dirname} from "./src/api/utils/index.js";
import {viewRoutes, productRoutes, adminroutes } from "./src/api/routes/index.js";

// Estraemos con el destructuring las variables port y session_key
const { port, session_key } = environments;
const PORT = port;

app.use(cors())   // Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use(express.json()) // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true })) // Middleware para parsear el cuerpo de las solicitudes con URL-encoded (formulario)
app.use(loggerURL); // Middleware personalizado para loguear las URLs de las peticiones
app.use(express.static(join(__dirname, "src/public"))); // Middleware para servir archivos estaticos

console.log("SESSION_KEY:", session_key);

app.use(session({
  secret: session_key,
  resave: false,
  saveUninitialized: true
}));

// configuramos ejs como motor de plantillas para renderizar vistas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.get("/", (req, res) => {
    res.send("Hola mundo")
});
// Creamos un endpoint minimo para verificar la conexion a la BBDD
// http://localhost:3000/api/products es nuestro endpoint, es decir la URL especifica de nuestra API Rest para obtener un recurso

app.use("/api/products", productRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", adminroutes);
app.use("/cliente", express.static(join(__dirname, "../frontend/cliente")));
app.use("/css", express.static(join(__dirname, "../frontend/css")));
app.use("/js", express.static(join(__dirname, "../frontend/js")));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})