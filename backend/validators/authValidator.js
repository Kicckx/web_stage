const { body } = require('express-validator');

const registerValidator = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Veuillez fournir un email valide'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('Le prénom est requis'),
  body('lastname')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis'),
];

module.exports = { registerValidator };
