import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkPermissions = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                res.status(401).json({ error_message: "Token no proporcionado" });
                return;
            }
            const token = authorizationHeader.split(' ')[1];
            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { permissions: string[] };

            // Verificar si el usuario tiene los permisos requeridos
            const hasPermission = requiredPermissions.every((permission) =>
                decoded.permissions.includes(permission)
            );

            if (!hasPermission) {
                res.status(403).json({ error_message: "No tienes permisos para acceder a esta ruta" });
                return;
            }

            // Adjuntar el usuario decodificado a la request para uso posterior
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ error_message: "Token inválido o expirado" });
            return;
        }
    };
};
