const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const { hashPassword } = require('../utils/auth')


router.post('/signin', async (req, res, next) => {
  const { email, username, password } = req.body;
  
  try {
    const hashedPassword = await hashPassword(password)
    const userRole = await Role.findOne({ name: 'normal_user' });

    const newUser = new User({ 
      email, 
      username, 
      password: hashedPassword,
      roles: [userRole._id]
    });
    
    await newUser.save();
    res.status(201).json({ message: "Usuario creado con éxito" });

  } catch (error) {
      
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
      next(error)
  }
});

module.exports = router;
