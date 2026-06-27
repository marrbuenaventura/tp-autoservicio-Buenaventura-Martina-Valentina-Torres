// Importamos el modulo dotenv para importar las variables de entorno
import dotenv from "dotenv";

// fileURLToPath convierte la URL del módulo actual (import.meta.url)
// en una ruta de archivo normal de Windows/Linux.
// Esto es necesario porque en ES Modules (cuando usamos "import" en vez de "require")
// no existe la variable __filename como en CommonJS, hay que armarla a mano
import { fileURLToPath } from 'url'

// dirname saca la carpeta a partir de una ruta de archivo
// join arma rutas uniendo partes, sin importar si es Windows o Linux
import { dirname, join } from 'path'

// __filename = la ruta completa de ESTE archivo (environments.js)
// __dirname = la carpeta donde está este archivo, sin el nombre del archivo
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Debido a un error con la contraseña de la base de datos (Access denied),
// donde la variable DB_PASSWORD llegaba como undefined al ejecutar el servidor,
// se solucionó indicándole a dotenv la ruta EXACTA del archivo .env,
// en vez de dejar que la busque solo (lo cual depende de desde dónde se ejecuta "node index.js").
// Subimos 3 niveles de carpetas (config -> api -> src) para llegar a la raíz del backend,
// que es donde está ubicado el .env

dotenv.config({ path: join(__dirname, '../../../.env') })

// Exportamos un objeto con la configuración ya organizada
export default {
    // process.env.PORT lee la variable PORT del .env
    // El || 4000 es un valor por defecto, por si la variable no existe
    port: process.env.PORT || 4000,
    session_key: process.env.SESSION_KEY,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}