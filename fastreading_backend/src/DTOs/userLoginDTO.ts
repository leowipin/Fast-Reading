import User from '../schemas/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RoleDocument } from "../schemas/role.js";

interface UserLoginInputDTO {
    email: string;
    password: string;
}

interface UserTokenDTO {
    token: string;
}

export const transformUserLoginDTO = async (input:UserLoginInputDTO): Promise<UserTokenDTO> => {
    const {email, password} = input;
    const user = await User.findOne({ email }).populate<{ role: RoleDocument }>("role");

    if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = new Error("Correo o contraseña incorrecto") as any;
        error.status = 401;
        error.showMessageToUser = true;
        throw error;
    }
     // Crear el payload del token con username, email y role
    const payload = {
        username: user.username,
        email: user.email,
        role: user.role.name, // Nombre del rol
        permissions: user.role.permissions, // Permisos asociados al rol
    };

    // Generar el token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    return { token };
}