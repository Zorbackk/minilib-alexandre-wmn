// frontend/services/empruntsService.ts
import type { Emprunt, EmpruntAvecDetails, CreateEmpruntDto } from "../types"
import { apiRequest } from "./api"

/* Récupère tous les emprunts */
export async function getEmprunts() : Promise<Emprunt[]> {
  return apiRequest<Emprunt[]>(`/emprunts`)
}

/* Récupère les emprunts en-cours */
export async function getNonRendus() : Promise<Emprunt[]> {
  return apiRequest<Emprunt[]>(`/emprunts/en-cours`)
}

/* Récupère les emprunts en retard */
export async function getRetards() : Promise<EmpruntAvecDetails[]> {
  return apiRequest<EmpruntAvecDetails[]>(`/emprunts/retards`)
}

/* Réaliser un emprunt */
export async function createEmprunt(data: CreateEmpruntDto) : Promise<Emprunt> {
  return apiRequest<Emprunt>(`/emprunts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* Effectuer un retour */
export async function setEndEmprunt(id: number) : Promise<Emprunt> {
  return apiRequest<Emprunt>(`/emprunts/${id}`, {
    method: "PATCH"
  });
}