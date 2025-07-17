# frontend/Dockerfile
FROM node:20

# Create app directory
WORKDIR /app

# Copie package.json d’abord pour optimiser le cache
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Ensuite, copie le reste des fichiers
COPY . .

# Expose le port Vite
EXPOSE 5173

# Lancement du serveur Vite
CMD ["npm", "run", "dev"]
