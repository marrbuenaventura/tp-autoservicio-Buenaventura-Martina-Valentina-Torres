import connection from "../database/db.js";
import bcrypt from "bcrypt";

export const adminLoginView = async (req,res) => {
    res.render("login", {
        title: "login de usuario de administrador",
        link_estilos: "/css/styles.css",
        about: "AUTENTICACION DE USUARIO"
    })
}

export const processLoginInfo = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Evitamos una consulta innecesaria
        if(!email || !password) {
            return res.render("login", {
                title: "login",
                about: "AUTENTICACION DE USUARIO",
                error: "Por favor, complete todos los campos"
            });        
        }

        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await connection.query(sql, [email]);

        if(rows.length === 0){
            return res.render("login", {
                title:"login",
                about: "AUTENTICACION DE USUARIO",
                error: "Usuario no encontrado"
            });
        }

            const user = rows[0];
            console.table(user);

// comparamos el hasheo
        const match = await bcrypt.compare(password, user.password);
        console.log(match);

        if(match){
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            res.redirect("/dashboard/index");
        } else {
            return res.render("login", {
                title:"login",
                about: "AUTENTICACION DE USUARIO",
                error: "Contraseña incorrecta"
            });
        }

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