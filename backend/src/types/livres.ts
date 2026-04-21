// backend/src/types.livres.ts

/**
 * Représente un livre dans le catalogue MiniLib
 * Correspond à la table livres dans PostgreSQL
 */
export interface Livre {
  id: number;
  isbn: string;
  titre: string;
  auteur: string;
  annee: number;
  genre: string;
  disponible: boolean;
}

/**
 * Données pour créer un livre - sans id (SERIAL dans PostgreSQL) ni disponible
 */
export interface CreateLivreDto {
  isbn: string;
  titre: string;
  auteur: string;
  annee?: number; // ? peut être undefined
  genre?: string;
}

/**
 * Données pour mettre un jour un livre - sans isbn car contrainte unique « livres_isbn_key »
 */
export interface UpdateLivreDto {
  titre: string;
  auteur: string;
  annee?: number; // ? peut être undefined
  genre?: string;
}

/**
 * Filtres optionnels pour la liste des livres.
 */
export interface FiltresLivre {
  genre?: string;
  disponible?: boolean;
  recherche?: string;
}
