// Point d'entrée Express -------------------------------------------------------------------

// Point d'entrée du serveur Express MiniLib
// Démarre avec : npm run dev

import express, { ErrorRequestHandler } from "express";
import cors from "cors";
// Node 24 : plus de dotenv // Charge les variables depuis .env

// Import des routeurs (on les créera juste après)
import livresRouter from "./routes/livres.js";
import adherentsRouter from "./routes/adherents.js";
import empruntsRouter from "./routes/emprunts.js";

// Initialisation de l'application Express---------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globaux ----------------------------------------------------------------------
// cors(): autorise les requêtes cross-origin (React sur port 3000 -> API sur 5000)
app.use(cors());

// express.json() : parse automatiquement le body JSON des requêtes POST/PUT
app.use(express.json());

// Middleware de logging minimaliste - affiche chaque requête reçue
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // next() = passer au middleware/route suivante
});

// Routes -------------------------------------------------------------------------------------
// Toutes les routes de livres seront préfixées par /api/v1/livres
app.use("/api/v1/livres", livresRouter);

// Toutes les routes des adhérents seront préfixées par /api/v1/adherents
app.use("/api/v1/adherents", adherentsRouter);

// Toutes les routes des emprunts seront préfixées par /api/v1/emprunts
app.use("/api/v1/emprunts", empruntsRouter);

// Route de santé - permet de vérifier que le serveur tourne
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Serveur MiniLib opérationnel",
    timestamp: new Date().toISOString(),
  });
});

// Middleware de gestion des routes inconnues (404)
app.use((req, res) => {
  res.status(404).json({
    erreur: `Route ${req.method} ${req.url} non trouvée`,
  });
});

// Middleware de gestion des erreurs serveur (500)
// Express reconnaît ce middleware à ses 4 paramètres (err en premier)
app.use(((err, req, res, next) => {
  console.error("Erreur serveur:", err.message);
  res.status(500).json({ erreur: "Erreur interne du serveur" });
}) as ErrorRequestHandler);

// Middleware errorHandler global
// Express reconnaît ce middleware à ses 4 paramètres (err, req, res, next)
app.use(((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? "Erreur interne du serveur" : err.message;
  if (status === 500) console.error("[ERREUR]", err.message);
  res.status(status).json({ erreur: message });
}) as ErrorRequestHandler);

// Démarrage ---------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Serveur MiniLib démarré sur http://localhost:${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV}`);
});

export default app; // export pour les tests futurs
