// backend/src/controllers/livresController.js — version async + PostgreSQL
// Controller pour les livres — logique métier entre les routes et les données

import * as livresModel from '../models/livresData.js'

import { RequestHandler } from 'express';

/**
* Récupère tous les livres avec filtres optionnels via query params.
* GET /api/v1/livres?genre=Informatique&disponible=true&recherche=clean
*
* @param {import('express').Request} req - Requête Express
* @param {import('express').Response} res - Réponse Express
*/
const getLivres : RequestHandler = async (req, res) => {
  try {
    // req.query contient les paramètres de l'URL (?genre=...&disponible=...)
    const { genre, disponible, recherche } = req.query;
    const livres = await livresModel.findAll({
    genre: genre as string | undefined,
    disponible: disponible === 'true' ? true : disponible === 'false' ? false : undefined,
    // On type dans le controller qui est l'interface entre le HTTP et l'applicatif
    // On fait ici une conversion string -> boolean
    recherche: recherche as string | undefined,
  });    
  res.json(livres); // 200 OK implicite
  } catch (error) {
    // Logger erreur côté serveur
    console.error(error)
    res.status(500).json({ erreur: 'Erreur lors de la récupération des livres'});
  }
};

/**
* Récupère un livre par son id.
* GET /api/v1/livres/:id
*
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
const getLivreById : RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string);
  const livre = await livresModel.findById(id);
  if (!livre) {
    // 404 Not Found - Ressource inexistante
    return res.status(404).json({ erreur: `Livre id:${req.params.id} non trouvé`});
  }
  res.json(livre)
};

/**
* Rechercher un livre par auteur ou titre ou mot présent dans l'un ou l'autre
* GET api/v1/livres/recherche?q=
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
const rechercherLivres : RequestHandler = async (req, res) => {
  const { q } = req.query as {q: string | undefined};
  if (!q) return res.status(400).json({ erreur: 'Paramètre q requis'});
  const resultats = await livresModel.findAll({ recherche : q});
  res.json({ query: q, total: resultats.length, resultats});
};

/**
* Crée un nouveau livre.
* POST /api/v1/livres
* Body JSON attendu : { isbn, titre, auteur, annee, genre }
* Logique de vérification déportée dans validateLivre.js
*
* @param {import('express').Request} req
* @param {import('express').Response} res
 */
const createLivre : RequestHandler = async (req, res) => {
  
  const { isbn, titre, auteur, annee, genre } = req.body;
  const manquants = ['isbn', 'titre', 'auteur'].filter(k => !req.body[k]);
  if (manquants.length > 0) 
    return res.status(400).json({erreur: 'Champs manquants', champs: manquants})
  const nouveau = await livresModel.create({ isbn, titre, auteur, annee, genre});
// 201 Created - ressource crée avec succès
res.status(201).json(nouveau)
};

/**
* Met à jour un livre existant.
* PUT /api/v1/livres/:id
*
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
const updateLivre : RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string);
  const misAJour = await livresModel.update(id, req.body);
  if (!misAJour) {
    return res.status(404).json({ erreur: `Livre id:${req.params.id} non trouvé`})
  }
  res.json(misAJour)
};

/**
* Supprime un livre.
* DELETE /api/v1/livres/:id
*
* @param {import('express').Request} req
* @param {import('express').Response} res
*/

const deleteLivre : RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string);
  const supprimé = await livresModel.remove(id);
  if (!supprimé) {
    return res.status(404).json({ erreur: `Livre id:${req.params.id} non trouvé`});
  }
  // 204 No Content - succès sans corps de réponse
  res.status(204).send();
};

export { getLivres, getLivreById, rechercherLivres, createLivre, updateLivre, deleteLivre }
