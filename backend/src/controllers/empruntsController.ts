// backend/src/controllers/empruntsController.js
import * as empruntsModel from '../models/empruntsModel.js'

import { RequestHandler } from 'express';

/** GET /api/v1/emprunts - liste tous les emprunts réalisés */
export const getEmprunts : RequestHandler = async (req, res) => {
  const borrows = await empruntsModel.findAll();
  res.json(borrows);
};

/** GET /api/v1/emprunts/en-cours */
export const getNonRendus : RequestHandler = async (req, res) => {
  const borrowed = await empruntsModel.findAllNonReturned();
  res.json(borrowed);
};

/** GET api/v1/emprunts/retards */
export const getRetards : RequestHandler = async (req, res) => {
  const result = await empruntsModel.findRetards();
  res.json(result);
}

/** POST /api/v1/emprunts - Réalise un emprunt */
export const empruntLivre : RequestHandler = async (req, res) => {
  const {livre_id, adherent_id} = req.body;
  const manquants = ['livre_id', 'adherent_id'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({erreur: 'Champs manquants', champs: manquants});
  const emprunt = await empruntsModel.borrow({livre_id, adherent_id});
  res.status(201).json(emprunt);
};

/** PATCH /api/v1/emprunts/:id - Réalise un retour */
export const retourLivre : RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string)
  const retour = await empruntsModel.returnLivre(id);
  if (!retour)
    return res.status(404).json({erreur: `Emprunt id:${req.params.id} non trouvé`});
  res.json(retour);
};
