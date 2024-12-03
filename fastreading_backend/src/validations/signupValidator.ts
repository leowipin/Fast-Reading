import { body } from 'express-validator';

export const signupValidator = [
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('El nombre de usuario es obligatorio.')
    .isLength({ min: 3, max: 20 })
    .withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres.'),
  
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('El correo electrónico es obligatorio.')
    .isEmail()
    .withMessage('Debe ser una dirección de correo electrónico válida.'),
  
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('La contraseña es obligatoria.')
    .isLength({ min: 4, max: 32 })
    .withMessage('La contraseña debe tener entre 4 y 32 caracteres.')
];

