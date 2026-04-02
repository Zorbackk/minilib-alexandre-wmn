// frontend/src/services/livreService.ts
import type { Livre, CreateLivreDto, FiltresLivre } from "../types"
import { apiRequest } from "./api.ts"

/** 
* Récupère tous les livres, avec filtres optionnels.
*/
export async function getLivres(filtres: FiltresLivre = {}) : Promise<Livre[]> {
  const params = new URLSearchParams(); // conteneur vide pour les paramètres
  // on ajoute les filtres nécessaires
  if (filtres.genre) params.append("genre", filtres.genre);
  if (filtres.recherche) params.append("recherche", filtres.recherche);
  if (filtres.disponible !== undefined) params.append("disponible", String(filtres.disponible));
  // conversion en string
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiRequest<Livre[]>(`/livres${query}`); // on colle la string de recherche au endpoint
}

/** 
* Récupère un livre par son id.
*/
export async function getLivreById(id: number) : Promise<Livre> {
  // GET Par défaut
  return apiRequest<Livre>(`/livres/${id}`);
}

/** 
* Crée un nouveau livre 
*/
export async function creerLivre(data: CreateLivreDto) : Promise<Livre> {
  return apiRequest<Livre>("/livres", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** 
* Supprime un livre par son id
*/
export async function supprimerLivre(id: number) : Promise<void> {
  return apiRequest<void>(`/livres/${id}`, {method: "DELETE"});
}