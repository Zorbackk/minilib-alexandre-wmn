 # MiniLib - Gestion de bibliothèque

 ## Contexte

 Dans le cadre d'un exercice de la formation Concepteur Développeur d'Application (AFPA de Brest), il m'est demandé de réaliser une application web de gestion de bibliothèque. 

 Le projet constitue un projet logiciel complet : 

 - Un front-end
 - Un backend
 - Une base de données 
 - Une conteneurisation Docker


 ## Stack 

![React](https://img.shields.io/badge/React-18-blue)![Node.js](https://img.shields.io/badge/Node.js-20-green)![Express](https://img.shields.io/badge/Express-5.2-orange)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-purple)![Docker](https://img.shields.io/badge/Docker-Compose-blue)


 ## Principales fonctionnalités

 - Consulter et gérer un catalogue de livres (CRUD)
 - Gérer les adhérents de la bibliothèque
 - Enregistrer les emprunts et les retours
 - Savoir quels livres sont disponibles et lesquels sont en retard
 - Accéder à l'application depuis n'importe quel ordinateur via un navigateur

 ## Auteur

Alexandre **"Zorback"** Wiemann - Développeur Fullstack en formation CDA à l'AFPA de Brest, ci-dessous mes liens : 

  - [Mon portfolio](https://nevezio.com/)
  - [Mon LinkedIn](https://www.linkedin.com/in/alexandre-wiemann/)

## Démarrage avec Docker

## Prérequis 
 - Docker 26+ et Docker compose v2+

 ### Développement 
 ``` bash

 # Copier les variables d'environnement
 cp .env.example .env
 # Remplir le .env avec vos valeurs 

 # Démarrer l'application complète
 docker compose up --build

 # Accéder à l'application 
 # Frontend : http://localhost:3000
 # API : http://localhost:5000
 ```

 ### Production 
 ```bash
 docker compose -f docker-compose.prod.yml up -d --build
 ```
 
