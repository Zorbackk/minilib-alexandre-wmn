// frontend/src/services/api.ts
// La couche service isole tous les appels réseaux
// Les composants appellent le service - jamais fetch directement
// Client HTTP centralisé - Toute l'app passe par ici

// Vite expose les variables VITE_ via import.meta.env
// Changemetn de la base en "/api/v1" car nginx proxifie déjà le "localhost:5000"
const BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

export interface ApiError {
  erreur: string;
  champs?: string[];
}

/**
 * Effectue un appel HTTP vers l'API MiniLib
 * Lance une Error si le statut HTTP est >= 400
 *
 * @param endpoint Chemin relatif ex: "/livres" ou "livres/1"
 * @param options Options fetch natives (method, body, headers...)
 * @returns Réponse parsée en JSON, typée T
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    // Tenter de lire le message d'erreur renvoyé par l'API
    const erreur: ApiError = await response.json().catch(() => ({
      erreur: `Erreur HTTP ${response.status}`,
    }));
    throw new Error(erreur.erreur);
  }

  // 204 No Content : pas de corps à parser (DELETE)
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
