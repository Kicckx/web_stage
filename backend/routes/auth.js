const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('firstname').notEmpty(),
    check('lastname').notEmpty(),
  ],
  register
);

router.post(
  '/login',
  [
    check('email').isEmail(),
    check('password').exists(),
  ],
  login
);

module.exports = router;
