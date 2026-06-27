import connection from "../database/db.js";

export const adminLoginView = async (req,res) => {
    res.render("login", {
        title: "login de usuario de administrador",
        link_estilos: "/css/styles.css",
        about: "AUTENTICACION DE USUARIO"
    })
}

export const processLoginInfo = async (req, res) => {
    try {
        // Recibimos los datos de los campos email y password
        // Estos datos, gracias al middleware de parseo de urlencoded ya entran a este endpoint como objetos JS
        const { email, password } = req.body;

        // Evitamos una consulta innecesaria
        if(!email || !password) {
            return res.render("login");            
        }

            // TO DO, Crearemos el modelo de usuarios
        const sql = "SELECT * FROM users where email = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);
            //error si no existe admin
            //guardamos el usurio que recibimos en la variables rows 

            //id name usuario password 

            const user = rows[0];
            console.table(user);

            // Una vez que recibimos a nuestro usuario admin, vamos a creada una sesion
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        // con la sesion creada redirigimos al dashboard
        res.redirect("/dashboard/index");
    } catch(error){
        console.log(error);
    }
}

// cerrar sesion
export const destroyLogin = (req, res) => {
    req.session.destroy((error) => {
        if (error){
            //mensaje error, error
            console.log("No se ha podido cerrar la sesion", error);
            // return status 500 json mensaje error
            return res.status(500).json({
                message: "error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    })
}