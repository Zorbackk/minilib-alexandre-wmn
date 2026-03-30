import express from 'express';
import asyncWrapper from '../middleware/asyncWrapper.js'
import * as controller from '../controllers/adherentsController.js'

const router = express.Router(); 

// GET /api/v1/adherents → liste tous les adhérents
router.get('/', asyncWrapper(controller.getAdherents));

// GET /api/v1/adherents/:id → détail d'un adhérent
router.get('/:id', asyncWrapper(controller.getAdherentById));

// POST /api/v1/adherents → ajout d'un adhérent
router.post('/', asyncWrapper(controller.createAdherent));

// DELETE /api/v1/adherents/:id → soft delete adhérent
router.delete('/:id', asyncWrapper(controller.desactiverAdherent));

export default router;