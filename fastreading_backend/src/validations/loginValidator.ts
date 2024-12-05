import { body } from 'express-validator';

export const loginValidator = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('El correo es obligatorio.'),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('La contraseña es obligatoria.')
    .isLength({ min: 4, max: 32 })
    .withMessage('La contraseña debe tener entre 4 y 32 caracteres.')
];