# backend/Dockerfile
# L'image qui contient l'API Node.js/Express

# On part d'une image Node complète pour pouvoir compiler le TypeScript
FROM node:24-alpine AS builder

WORKDIR /app

# On copie package*.json en premier pour profiter du cache Docker :
# si ces fichiers n'ont pas changé, npm ci ne sera pas relancé au prochain build
COPY package*.json ./

# On installe TOUTES les dépendances (y compris devDependencies comme typescript)
# Afin de pouvoir run TypeScript sans souci on remplace start": "node --env-file=.env src/app.ts"
# par "start":tsc 
RUN npm ci

# On copie les sources TypeScript et la config du compilateur
COPY src/ ./src/
COPY tsconfig.json ./

# On compile : tsc lit tsconfig.json et génère les fichiers JS dans ./dist/
RUN npm run build


# Nouvelle image vierge : on repart de zéro, sans les devDependencies ni les sources TS
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

# Cette fois on n'installe QUE les dépendances de production (express, pg, cors...)
# typescript, tsx, @types/* ne seront PAS dans l'image finale = image plus légère
RUN npm ci --only=production

# On récupère uniquement le dossier dist/ compilé depuis l'étape builder
COPY --from=builder /app/dist ./dist

EXPOSE 5000

# On lance le JS compilé directement avec Node, sans TypeScript
CMD ["node", "dist/app.js"]
