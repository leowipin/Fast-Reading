const express = require('express')
const router = express.Router()
const Role = require('../models/role');
const {PERMISSIONS} = require('../utils/permissions')

router.post('/createRole', async(req, res)=>{
    const { name, permissions } = req.body;

    const validPermissions = Object.values(PERMISSIONS);
    const invalidPermissions = permissions.filter(perm => !validPermissions.includes(perm));

    if (invalidPermissions.length > 0) {
        return res.status(400).json({
            errorMessage: `Permisos inválidos: ${invalidPermissions.join(', ')}`,
        });
    }

    try {
        const newRole = new Role({ name, permissions });
        await newRole.save();
        
        res.status(201).json({ message: "Rol creado exitosamente" });

    } catch (error) {
        console.error("Error al crear el rol:", error);

        if (error.code === 11000) {
            return res.status(400).json({ errorMessage: "El nombre del rol ya existe" });
        }
        
        res.status(500).json({ errorMessage: "Error al crear el rol" });
    }
});

router.get('/getPermissions', (req, res) => {
    const permissionsArray = Object.values(PERMISSIONS);
    res.status(200).json(permissionsArray);
});

module.exports = router;