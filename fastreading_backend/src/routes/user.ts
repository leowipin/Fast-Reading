import express, { Request, Response, NextFunction } from 'express';
import User from '../schemas/user.js';
import { transformUserSignUpDTO } from '../DTOs/userSignUpDTO.js';
import { signupValidator } from '../validations/signupValidator.js';
import { handleValidationErrors } from '../utils/validationHandler.js';

const router = express.Router();


router.post('/signup', signupValidator, handleValidationErrors, async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  
  try {
    const signupUser = await transformUserSignUpDTO(req.body)
    const newUser = new User({ ...signupUser });
    await newUser.save();
    return res.status(201).json({ message: "Registro exitoso" });

  } catch (error: any) {
      
      if (error.code === 11000) {
        const fields = Object.keys(error.keyPattern);
        let message;
        if (fields.includes('email')) {
            message = 'Ya existe un usuario con el correo ingresado';
        } else if (fields.includes('username')) {
            message = 'Ya existe un usuario con el nombre de usuario ingresado';
        }
        return res.status(400).json({ error_message: message });
      }
      next(error)
  }
});

router.get("/login", async(req, res, next)=>{

});

export default router;
