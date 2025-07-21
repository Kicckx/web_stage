const pool = require('../database');

const updateProfile = async (req, res) => {
  const { email, firstname, lastname } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      'UPDATE users SET email = $1, firstname = $2, lastname = $3 WHERE id = $4 RETURNING id, email, firstname, lastname',
      [email, firstname, lastname, userId]
    );

    res.json({ message: 'Profil mis à jour', user: result.rows[0] });
  } catch (err) {
    console.error('Erreur updateProfile:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  updateProfile,
};
