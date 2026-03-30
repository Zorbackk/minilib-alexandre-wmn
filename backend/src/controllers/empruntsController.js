// backend/src/controllers/empruntsController.js
import * as empruntsModel from '../models/empruntsModel.js'

/** GET /api/v1/emprunts - liste tous les emprunts réalisés */
export const getEmprunts = async (req, res) => {
  const borrows = await empruntsModel.findAll();
  res.json(borrows);
};

/** GET /api/v1/emprunts/en-cours */
export const getNonRendus = async (req, res) => {
  const borrowed = await empruntsModel.findAllNonReturned();
  res.json(borrowed);
};

/** POST /api/v1/emprunts - Réalise un emprunt */
export const empruntLivre = async (req, res) => {
  const {livre_id, adherent_id} = req.body;
  const manquants = ['livre_id', 'adherent_id'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({erreur: 'Champs manquants', champs: manquants});
  const emprunt = await empruntsModel.borrow({livre_id, adherent_id});
  res.status(201).json(emprunt);
};

/** PATCH /api/v1/emprunts/:id - Réalise un retour */
export const retourLivre = async (req, res) => {
  const retour = await empruntsModel.returnLivre(req.params.id);
  if (!retour)
    return res.status(404).json({erreur: `Emprunt id:${req.params.id} non trouvé`});
  res.json(retour);
};
