import express from 'express'
import Role from '../schemas/role.js';
import { PERMISSIONS } from '../utils/permissions.js';
import { transformRoleCreationDTO } from '../DTOs/roleCreationDTO.js';
import { checkPermissions } from '../utils/checkPermissions.js';

const router = express.Router()

router.post('/createRole', checkPermissions(['create_role']), async(req, res, next):Promise<any>=>{

    try {
        
        const roleDTO = transformRoleCreationDTO(req.body);
        const newRole = new Role({...roleDTO});
        await newRole.save();
        return res.status(201).json({ message: "Rol creado exitosamente" });

    } catch (error: any) {

        if (error.code === 11000) {
            return res.status(400).json({ error_message: "El nombre del rol ya existe" });
        }
        next(error)

    }

});

router.get('/getPermissions', checkPermissions(['create_role']), (req, res) => {

    const permissionsArray = Object.values(PERMISSIONS);
    res.status(200).json(permissionsArray);

});

export default router;