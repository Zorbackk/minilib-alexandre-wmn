# frontend/Dockerfile

# Stage 1 : compiler le projet React

FROM node:24-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Variables d'environnement Vite pour l'URL de l'API
# En production Docker, Nginx proxy /api/ -> backend:5000
ENV VITE_API_URL=/api/v1
RUN npm run build

# dist/ contient les fichiers statiques compilés

# Stage 2 : Servir avec Nginx (image ~25Mo)

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]