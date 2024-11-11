import express from 'express'
import Role from '../models/role.js';
import { PERMISSIONS } from '../utils/permissions.js';

const router = express.Router()

router.post('/createRole', async(req, res, next):Promise<any>=>{
    const { name, permissions } = req.body;

    try {
        const newRole = new Role({ name, permissions });
        await newRole.save();
        
        return res.status(201).json({ message: "Rol creado exitosamente" });

    } catch (error: any) {

        if (error.code === 11000) {
            return res.status(400).json({ errorMessage: "El nombre del rol ya existeaas" });
        }
        
        next(error)
    }
});

router.get('/getPermissions', (req, res) => {
    const permissionsArray = Object.values(PERMISSIONS);
    res.status(200).json(permissionsArray);
});

export default router;