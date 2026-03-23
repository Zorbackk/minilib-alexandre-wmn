// backend/src/routes/livres.js 
// Routeur Express pour les livres
// Toutes ces routes sont préfixées par /api/v1/livres dans app.js

import express from 'express';
const router = express.Router();
import * as controller from '../controllers/livresControllers.js'
import validateLivre from '../middleware/validateLivre.js';

// GET /api/v1/livres → liste tous les livres (+ filtres query params)
router.get('/', controller.getLivres);

// GET  /api/v1/livres/recherche?q=clean
// Simplification de la route en passant la méthode dans le controller
router.get('/recherche', controller.rechercherLivres)
// Cette route doit être AVANT router.get(':id') 
// Sinon Express interpréterait 'recherche' comme un id !

// GET /api/v1/livres/:id → détail d'un livre
router.get('/:id', controller.getLivreById);

// POST /api/v1/livres → créer un nouveau livre
// Middlewar validateLivre va vérifier la présence de l'ensemble des champs avant
// de passer au controller
router.post('/', validateLivre, controller.createLivre);

// PUT /api/v1/livres/:id → modifier un livre
router.put('/:id', validateLivre, controller.updateLivre);

// DELETE /api/v1/livres/:id → supprime un livre
router.delete('/:id', controller.deleteLivre);

export default router;