// backend/src/controllers/adherentsController.js
import * as adherentsModel from '../models/adherentsModel.js'

import { RequestHandler } from 'express';

/** GET /api/v1/adherents */
export const getAdherents : RequestHandler = async (req, res) => {
  const adherents = await adherentsModel.findAll();
  res.json(adherents);
}

/** GET /api/v1/adherents/:id */
export const getAdherentById : RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string);
  const adherent = await adherentsModel.findById(id);
  if (!adherent) 
    return res.status(404).json({ erreur : `Adhérent id:${req.params.id} non trouvé`});
  res.json(adherent);
};


/** POST /api/v1/adherents */
export const createAdherent : RequestHandler = async (req, res) => {
  const {nom, prenom, email} = req.body;
  const manquants = ['nom', 'prenom', 'email'].filter(k => !req.body[k]);
  if (manquants.length > 0) 
    return res.status(400).json({erreur: 'Champs manquants', champs: manquants});
  const nouveau = await adherentsModel.create({nom, prenom, email});
  res.status(201).json(nouveau);
};

/** DELETE /api/v1/adherents/:id - soft delete */
export const desactiverAdherent : RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string)
  const adherent = await adherentsModel.desactiver(id);
  if (!adherent)
    return res.status(404).json({erreur: `Adhérent id:${req.params.id} non trouvé`});
  res.json(adherent);
}
