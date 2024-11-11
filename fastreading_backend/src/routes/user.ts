import express from 'express';
import User from '../models/user.js';
import Role from '../models/role.js';
import { hashPassword } from '../utils/auth.js';

const router = express.Router();


router.post('/signup', async (req, res, next):Promise<any> => {
  const { email, username, password } = req.body;
  
  try {
    const hashedPassword = await hashPassword(password)
    const defaultRole = 'normal_user'
    const userRole = await Role.findOne({ name: defaultRole });

    if (!userRole) {
      const error = new Error(`Role ${defaultRole} not found`) as any;
      error.status = 500;
      return next(error);
    }

    const newUser = new User({ 
      email, 
      username, 
      password: hashedPassword,
      roles: [userRole._id]
    });
    
    await newUser.save();
    return res.status(201).json({ message: "Usuario creado con éxito" });

  } catch (error: any) {
      
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

router.get("/login", async(req, res, next)=>{

});

export default router;
