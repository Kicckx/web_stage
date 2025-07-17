# API d'Authentification Node.js

Une API d'authentification complète construite avec Node.js, Express.js et PostgreSQL.

## 🚀 Fonctionnalités

- **Inscription d'utilisateurs** avec validation des données
- **Connexion avec JWT** (JSON Web Tokens)
- **Route protégée** pour accéder au profil utilisateur
- **Hachage sécurisé des mots de passe** avec bcrypt
- **Validation des entrées** avec express-validator
- **Base de données PostgreSQL** avec pool de connexions
- **Logs détaillés** pour le débogage
- **Architecture modulaire** et scalable

## 📋 Prérequis

- Node.js (version 16+)
- PostgreSQL (version 12+)
- npm ou yarn

## 🔧 Installation

1. **Cloner le projet** (ou créer les fichiers)
```bash
mkdir auth-api-backend
cd auth-api-backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**
   - Créer une base de données PostgreSQL nommée `auth_db`
   - Exécuter le script SQL fourni dans `database/schema.sql`

4. **Configurer les variables d'environnement**
   - Copier le fichier `.env` et modifier les valeurs selon votre configuration
   - **Important**: Changer `JWT_SECRET` pour un secret sécurisé en production

5. **Démarrer le serveur**
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

## 📁 Structure du projet

```
auth-api-backend/
├── controllers/
│   └── authController.js     # Logique métier pour l'auth
├── database/
│   ├── db.js                 # Configuration PostgreSQL
│   └── schema.sql            # Structure de la base de données
├── middleware/
│   └── authMiddleware.js     # Middleware JWT
├── routes/
│   └── auth.js               # Routes d'authentification
├── validators/
│   └── authValidator.js      # Validation des données
├── .env                      # Variables d'environnement
├── server.js                 # Point d'entrée de l'application
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation
```

## 🛠 API Endpoints

### 1. Inscription d'un utilisateur
**POST** `/api/auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "MonMotDePasse123",
  "firstname": "John",
  "lastname": "Doe"
}
```

**Réponse (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "created_at": "2025-01-16T10:30:00.000Z"
  }
}
```

### 2. Connexion d'un utilisateur
**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "MonMotDePasse123"
}
```

**Réponse (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### 3. Obtenir le profil utilisateur
**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Réponse (200):**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "created_at": "2025-01-16T10:30:00.000Z",
    "updated_at": "2025-01-16T10:30:00.000Z"
  }
}
```

### 4. Test de santé
**GET** `/api/health`

**Réponse (200):**
```json
{
  "message": "API is running!",
  "timestamp": "2025-01-16T10:30:00.000Z"
}
```

## 🔐 Sécurité

- **Hachage des mots de passe** avec bcrypt (12 rounds)
- **Tokens JWT** avec expiration (24h)
- **Validation stricte** des entrées utilisateur
- **Middleware de sécurité** (helmet, cors)
- **Protection contre les injections SQL** avec requêtes préparées

## 🧪 Tests avec Postman

1. **Tester l'inscription**
   - Méthode: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body: Raw JSON avec email, password, firstname, lastname

2. **Tester la connexion**
   - Méthode: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body: Raw JSON avec email, password
   - Copier le token de la réponse

3. **Tester le profil**
   - Méthode: GET
   - URL: `http://localhost:5000/api/auth/profile`
   - Headers: `Authorization: Bearer [votre_token]`

## 🔄 Intégration avec un front-end React

```javascript
// Exemple d'utilisation avec fetch
const API_URL = 'http://localhost:5000/api/auth';

// Inscription
const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Connexion
const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Profil
const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
```

## 🐛 Débogage

Les logs sont affichés dans la console avec des emojis pour faciliter le débogage :

- ✅ Succès (connexion DB, inscription, connexion utilisateur)
- ❌ Erreurs (erreurs de base de données, validation, etc.)
- 🚀 Démarrage du serveur
- 🔄 Fermeture de l'application

## 📝 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `PORT` | Port du serveur | `5000` |
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@localhost:5432/auth_db` |
| `JWT_SECRET` | Secret pour signer les JWT | `votre_secret_tres_securise` |
| `NODE_ENV` | Environnement d'exécution | `development` ou `production` |

## 🚀 Déploiement

### Variables d'environnement en production
- Utilisez un secret JWT fort et unique
- Configurez `NODE_ENV=production`
- Utilisez une base de données PostgreSQL sécurisée

### Exemple de configuration pour Heroku
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=votre_secret_de_production_tres_securise
heroku config:set DATABASE_URL=postgresql://...
```

## 🔮 Améliorations possibles

- **Refresh tokens** pour une sécurité accrue
- **Réinitialisation de mot de passe** par email
- **Vérification d'email** à l'inscription
- **Limitation du taux de requêtes** (rate limiting)
- **Logs structurés** avec Winston
- **Tests automatisés** avec Jest
- **Documentation API** avec Swagger
- **Rôles et permissions** utilisateur

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

## 🆘 Support

Pour toute question ou problème :
1. Vérifiez que PostgreSQL est démarré
2. Vérifiez les variables d'environnement
3. Consultez les logs dans la console
4. Testez la connexion à la base de données

## 📚 Documentation API complète

### Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Erreur de validation |
| 401 | Non autorisé |
| 404 | Ressource non trouvée |
| 409 | Conflit (email déjà existant) |
| 500 | Erreur serveur |

### Validation des mots de passe

Les mots de passe doivent respecter les critères suivants :
- Minimum 8 caractères
- Au moins une lettre minuscule
- Au moins une lettre majuscule  
- Au moins un chiffre

### Durée de vie des tokens

- **JWT Token** : 24 heures
- **Expiration automatique** : Le token expire et doit être renouvelé

Cette API est prête pour la production et peut être facilement intégrée avec n'importe quel front-end moderne !