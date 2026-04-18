// backend/src/models/empruntsModel.js

/** 
* Accès aux données des emprunts via PostgreSQL
* @module empruntsModel 
*/

import pool from '../config/database.js'

import { Emprunt, EmpruntAvecDetails, CreateEmpruntDto } from '../types/index.js'

/** 
* @async.
* @returns {Promise<Array>} Retourne tous les emprunts en cours
* TODO-01: Attention sur les routes API qui seront définies : /emprunts/en-cours ou un query param ?rendu=false
*/
export const findAllNonReturned = async () : Promise<Emprunt[]> => {
  const result = await pool.query(`SELECT * FROM emprunts WHERE date_retour_effective IS NULL ORDER BY date_emprunt ASC`);
  return result.rows;
};

/** 
* @async.
* @returns {Promise<Array>} Retourne tous les emprunts listés
*/
export const findAll = async () : Promise<Emprunt[]> => {
  const result = await pool.query(`
    SELECT e.*,
    l.titre as titre_livre,
    a.nom || ' ' || a.prenom AS nom_adherent,
    e.date_retour_effective IS NULL AND e.date_retour_prevue < CURRENT_DATE AS en_retard
    FROM emprunts e
    JOIN livres l ON e.livre_id = l.id
    JOIN adherents a ON e.adherent_id = a.id
    ORDER BY e.date_emprunt ASC`);
  return result.rows;
};

/** 
* Trouve les emprunts en retard (qui ont dépassé la date de retour prévue)
* @async
* @returns {Promise<Array>} Emprunts en retard
*/
export const findRetards = async () : Promise<EmpruntAvecDetails[]> => {
  const result = await pool.query(`
    SELECT e.id, l.titre, a.nom || '' || a.prenom AS adherent,
    e.date_retour_prevue,
    CURRENT_DATE - e.date_retour_prevue AS jours_retard
    FROM emprunts e
    JOIN livres l ON e.livre_id = l.id
    JOIN adherents a ON e.adherent_id = a.id
    WHERE e.date_retour_effective IS NULL
    AND e.date_retour_prevue < CURRENT_DATE
    ORDER BY jours_retard DESC
    `);
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
export const borrow = async ({livre_id, adherent_id} : CreateEmpruntDto) : Promise<Emprunt> => {
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
export const returnLivre = async (id : number) : Promise<Emprunt | null> => {
  const result = await pool.query(`
    UPDATE emprunts SET date_retour_effective = CURRENT_DATE WHERE id = $1 RETURNING *`,
  [id]);
  return result.rows[0] || null; // plus explicite que renvoyer undefined si id non présent
};


