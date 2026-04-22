// backend/src/types/emprunt.ts

/** 
* Représente un emprunt dans le catalogue MiniLib
* Correspond à la table emprunts dans PostgreSQL 
*/
export interface Emprunt {
  id: number;
  livre_id: number;
  adherent_id: number;
  date_emprunt: string ; // ISO string depuis JSON
  date_retour_prevue: string ; // idem
  date_retour_effective: string  | null; // idem
}

// Interface enrichie avec les données des JOINs SQL
export interface EmpruntAvecDetails extends Emprunt {
  titre_livre: string;
  nom_adherent: string;
  en_retard: boolean;
}

/** 
* Données pour créer un emprunt - sans id (SERIAL dans PostgreSQL) ni dates
*/
export interface CreateEmpruntDto {
  livre_id: number | null;
  adherent_id: number | null;
}