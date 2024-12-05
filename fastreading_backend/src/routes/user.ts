import express, { Request, Response, NextFunction } from 'express';
import User from '../schemas/user.js';
import { transformUserSignUpDTO } from '../DTOs/userSignUpDTO.js';
import { signupValidator } from '../validations/signupValidator.js';
import { handleValidationErrors } from '../utils/validationHandler.js';
import { transformUserLoginDTO } from '../DTOs/userLoginDTO.js';
import { checkPermissions } from '../utils/checkPermissions.js';
import { loginValidator } from '../validations/loginValidator.js';

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
            message = 'Ya existe un usuario con el nombre ingresado';
        }
        return res.status(400).json({ error_message: message });
      }
      next(error)
  }
  
});

router.post("/login", loginValidator, handleValidationErrors, async (req: Request, res: Response, next: NextFunction): Promise<any>=>{
  
  try {

    const loggedUser = await transformUserLoginDTO(req.body)
    return res.status(200).json(loggedUser);

  } catch(error: any){

      next(error)
      
  }

});

router.get("/test", checkPermissions(['view_history']), async (req: Request, res: Response, next: NextFunction): Promise<any>=>{
  
  res.status(200).json({saludo: "hola si tienes el permiso"})

});

export default router;
