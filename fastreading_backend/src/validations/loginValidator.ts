import { body } from 'express-validator';

export const loginValidator = [
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('El nombre de usuario es obligatorio.')
    .isLength({ min: 3, max: 20 })
    .withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres.'),
    
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('La contraseña es obligatoria.')
    .isLength({ min: 4, max: 16 })
    .withMessage('La contraseña debe tener entre 4 y 16 caracteres.')
];