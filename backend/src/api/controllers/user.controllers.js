/* controladores de usuario */

import userModels from "../models/user.models.js";
import bcrypt from "bcrypt";

// crear nuevo usuario 

export const createAdminUser = async (req, res) => {
    try{
        const {nameUser, emailUser, passUser} = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passUser, saltRounds);

        const [rows] = await userModels.insertAdminUser(nameUser, emailUser, hashedPassword);

        res.status(201).json({
            message: "Usuario administrador creado exitosamente",
            userId: rows.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error interno del servidor"
        });
    }
}