import bcrypt from "bcrypt";
import UserModels from "../models/user.models.js";

const renderLogin = (res, error = null) => {
    return res.render("login", {
        title: "login de usuario de administrador",
        about: "AUTENTICACION DE USUARIO",
        error
    });
};

export const adminLoginView = async (req, res) => {
    renderLogin(res);
};

export const processLoginInfo = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return renderLogin(res, "Por favor, complete todos los campos");
        }

        const [rows] = await UserModels.selectUserByEmail(email);
        if (rows.length === 0) {
            return renderLogin(res, "Usuario no encontrado");
        }
        
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return renderLogin(res, "Contraseña incorrecta");
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.redirect("/dashboard/index");
    } catch (error) {
        console.log(error);
    }
};

// cerrar sesion y redirige al login
export const destroyLogin = (req, res) => {
    req.session.destroy((error) => {
        if (error){
            console.log("No se ha podido cerrar la sesion", error);
            return res.status(500).json({
                message: "Error interno del servidor"
            });
        }
        res.redirect("/login");
    })
}