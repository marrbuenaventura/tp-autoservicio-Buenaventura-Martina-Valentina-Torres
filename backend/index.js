import express from 'express'
import cors from 'cors'
import environments from './src/api/config/environments.js'
import connection from './src/api/database/db.js'
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import productRoutes from './routes/product.routes.js';


const PORT = environments.port
const app = express()

////////////////// MIDDLEWARES //////////////////
app.use(cors())   // Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use(express.json()) // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(loggerURL); // Middleware personalizado para loguear las URLs de las peticiones
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send('Hola mundo')
});

// Creamos un endpoint minimo para verificar la conexion a la BBDD
// http://localhost:3000/api/products es nuestro endpoint, es decir la URL especifica de nuestra API Rest para obtener un recurso

app.use('/api/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

