// backend/src/middleware/validateLivre.js -----------------------------------------------------------------

/***
 * Middleware express qui valide le body d'une requête POST/PUT livre.
 * S'utilise comme : router.post('/', validateLivre, controller.createLivre)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

import { RequestHandler } from "express";
const validateLivre: RequestHandler = (req, res, next) => {
  const { isbn, titre, auteur } = req.body;
  const erreurs = [];
  if (!isbn || isbn.trim() === "") erreurs.push("isbn est requis");
  if (!titre || titre.trim() === "") erreurs.push("titre est requis");
  if (!auteur || auteur.trim() === "") erreurs.push("auteur est requis");
  if (erreurs.length > 0) {
    return res
      .status(400)
      .json({ erreur: `Le champs suivant est manquant: ${erreurs}` });
  }
  next(); // Tout est ok, on passe au controller
};

export default validateLivre;
