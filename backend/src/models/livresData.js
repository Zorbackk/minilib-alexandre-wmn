// backend/src/models/livresModel.js

/**
* Accès aux données livres via PostgreSQL
* Remplace l'ancien livresData.js (placé maintenant dans archives/)
* Toutes les fonctions sont async - elles retournent des Promises.
* 
* @module livresModel
*/

import pool from '../config/database.js'

/** 
* 
* @async
* @param {Object} [filtres={}]
* @param {string} [filtres.genre]
* @param {boolean} [filtres.disponible]
* @param {string} [filtres.recherche] - Recherche dans titre ou auteur (ILIKE)
* @returns {Promise<Array>} Tableau de livres
*/

export const findAll = async (filtres = {}) => {
  const conditions = []; // tableau des morceaux WHERE : ["genre" = $1, "disponible" = $2]
  const valeurs = []; // tableau des valeurs réelles : [ROMAN, TRUE]
  let idx = 1; // compteur pour numéroter les paramètres $1, $2, etc...

  if (filtres.genre !== undefined) {
    conditions.push(`genre = $${idx++}`); // double $ : 1er = template literal JS 2nd = PostgreSQL
    valeurs.push(filtres.genre);
  }
  if (filtres.disponible !== undefined) {
    conditions.push(`disponible = $${idx++}`);
    valeurs.push(filtres.disponible === 'true');
  }
  if (filtres.recherche) {
    conditions.push(`(titre ILIKE $${idx} OR auteur ILIKE $${idx})`);
    valeurs.push(`%${filtres.recherche}%`); // %...% est wildcard PostgreSQL : %harry% matche "Harry Potter"
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query(`SELECT * FROM livres ${where} ORDER BY titre`, valeurs);

  return result.rows;
};

/** 
* Trouve un livre par son id.
* @async
* @param {number} id
* @return {Promise<Object|null>} Livre ou null
 */
export const findById = async (id) => {
  const result = await pool.query('SELECT * FROM livres WHERE id = $1, [id]');
  return result.rows[0] | null;
}

/** 
* Crée un nouveau livre.
* @async
* @param {Object} data - {isbn, titre, auteur, annee, genre} 
* @return {Promise<Object>} Le livre créé avec son id
*/
export const create = async ({ isbn, titre, auteur, annee, genre }) => {
  const result = await pool.query(
    `INSERT INTO livres (isbn, titre, auteur, annee, genre)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
    [isbn, titre, auteur, annee, genre]
    // RETURNING * retourne la ligne insérée - y compris l'id généré par SERIAL
  );
  return result.rows[0];
}

/** 
* Met à jour un livre
* @async
* @param {number} id
* @param {Object} data - Champs à modifier
* @returns {Promise<Object|null>} Livre mis à jour ou null
 */

export const update = async (id, data) => {
  // Construction dynamique du SET
  const champs = Object.keys(data);
  const valeurs = Object.values(data);
  if (champs.length === 0) return findById(id);

  const setClause = champs.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const result = await pool.query(
    `UPDATE livres SET ${setClause} WHERE id = $${champs.length + 1}
    RETURNING *`,
    [...valeurs, id]
  );
  return result.rows[0] || null;
}

/** 
* Supprime un livre
* @async
* @param {number} id
* @returns {Promise<boolean>} true si supprimé 
 */
export const remove = async (id) => {
  const result = await pool.query(
    `DELETE FROM livres WHERE id = $1 RETURNING id`, [id]
  );
  return result.rowCount > 0;
};

