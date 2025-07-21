const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../database');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, firstname, lastname } = req.body;

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id, email, firstname, lastname',
      [email, hashedPassword, firstname, lastname]
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: newUser,
      token,
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname } });
  } catch (error) {
    console.error('Erreur lors du login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { register, login };
