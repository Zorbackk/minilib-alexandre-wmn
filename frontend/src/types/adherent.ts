// backend/src/types/adherent.ts

/** 
* Représente un adherent dans le catalogue MiniLib
* Correspond à la table adhérents dans PostgreSQL 
*/
export interface Adherent {
  id: number;
  numero_adherent: string;
  nom: string;
  prenom: string;
  email: string;
  actif: boolean;
  created_at: string; // ISO string depuis JSON
}

// Données pour créer un adherent - sans id (SERIAL dans PostgreSQL) ni actif et created_at
// Les données non présentes dans le Dto sont générées
export interface CreateAdherentDto {
  nom: string;
  prenom: string;
  email: string;
}

// Données pour modifier un adherent - sans id (SERIAL dans PostgreSQL) ni actif et created_at
// Les données non présentes dans le Dto sont générées
export interface UpdateAdherentDto {
  nom: string;
  prenom: string;
  email: string
}