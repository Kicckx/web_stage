const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/user', require('./routes/user'));

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
