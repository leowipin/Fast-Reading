const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const { hashPassword } = require('../utils/auth')


router.post('/signin', async (req, res) => {
  const { email, username, password } = req.body;
  
  try {
    const hashedPassword = await hashPassword(password)
    const userRole = await Role.findOne({ name: 'normal_user' });

    if (!userRole) {
      console.error("Error en la creación de usuario: El rol base 'normal_user' no está definido en el sistema");
      return res.status(500).json({ errorMessage: "Hubo un error al crear el usuario" });
    }

    const newUser = new User({ 
      email, 
      username, 
      password: hashedPassword,
      roles: [userRole._id]
    });
    
    await newUser.save();
    res.status(201).json({ message: "Usuario creado con éxito" });

  } catch (error) {
      console.error("Error al crear el usuario:", error);
      
      if (error.code === 11000) {
        const fields = Object.keys(error.keyPattern);
        console.log(fields)
        let message;
    
        if (fields.includes('email')) {
            message = 'Ya existe un usuario con el correo ingresado';
        } else if (fields.includes('username')) {
            message = 'Ya existe un usuario con el nombre de usuario ingresado';
        }
    
        return res.status(400).json({ errorMessage: message });
      }
      
      res.status(500).json({ errorMessage: "Hubo un error al crear usuario" });
  }
});

module.exports = router;
