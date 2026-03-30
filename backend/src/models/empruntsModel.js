// backend/src/models/empruntsModel.js

/** 
* Accès aux données des emprunts via PostgreSQL
* @module empruntsModel 
*/

import pool from '../config/database.js'

/** 
* @async.
* @returns {Promise<Array>} Retourne tous les emprunts en cours
* TODO-01: Attention sur les routes API qui seront définies : /emprunts/en-cours ou un query param ?rendu=false
*/
export const findAllNonReturned = async () => {
  const result = await pool.query(`SELECT * FROM emprunts WHERE date_retour_effective IS NULL ORDER BY date_emprunt ASC`);
  return result.rows;
};

/** 
* @async.
* @returns {Promise<Array>} Retourne tous les emprunts listés
*/
export const findAll = async () => {
  const result = await pool.query(`SELECT * FROM emprunts ORDER BY date_emprunt ASC`);
  return result.rows;
};

/**
* Réalise un emprunt
* @async
* @param {Object} data - {livre_id et adherent_id}
* @param {number} data.livre_id
* @param {number} data.adherent_id
* @returns {Promise<Object>} Emprunt réalisé
*/
export const borrow = async ({livre_id, adherent_id}) => {
  const result = await pool.query(`
    INSERT INTO emprunts (livre_id, adherent_id, date_retour_prevue)
    VALUES ($1, $2, CURRENT_DATE + INTERVAL '14 days') RETURNING *`,
  [livre_id, adherent_id]);
  return result.rows[0];
};

/**
* Retour du livre emprunté
* @async
* @param {number} id
* @returns {Promise <Object || null>} Livre retourné
*/
export const returnLivre = async (id) => {
  const result = await pool.query(`
    UPDATE emprunts SET date_retour_effective = CURRENT_DATE WHERE id = $1 RETURNING *`,
  [id]);
  return result.rows[0] || null; // plus explicite que renvoyer undefined si id non présent
};


