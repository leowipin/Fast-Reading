const express = require('express')
const router = express.Router()
const Role = require('../models/role');
const {PERMISSIONS} = require('../utils/permissions')

router.post('/createRole', async(req, res, next)=>{
    const { name, permissions } = req.body;

    try {
        const newRole = new Role({ name, permissions });
        await newRole.save();
        
        res.status(201).json({ message: "Rol creado exitosamente" });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({ errorMessage: "El nombre del rol ya existe" });
        }
        
        next(error)
    }
});

router.get('/getPermissions', (req, res) => {
    const permissionsArray = Object.values(PERMISSIONS);
    res.status(200).json(permissionsArray);
});

module.exports = router;