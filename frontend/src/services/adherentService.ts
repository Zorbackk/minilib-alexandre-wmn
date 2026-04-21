// frontend/services/livreService.ts
import type { Adherent, CreateAdherentDto, UpdateAdherentDto } from "../types";
import { apiRequest } from "./api";

/* Récupère tous les adhérents */
export async function getAdherents(): Promise<Adherent[]> {
  return apiRequest<Adherent[]>(`/adherents`);
}

/* Récupère un adhérent par son id */
export async function getAdherentById(id: number): Promise<Adherent> {
  // Get par défaut
  return apiRequest<Adherent>(`/adherents/${id}`);
}

/* Créer un adhérent */
export async function createAdherent(
  data: CreateAdherentDto,
): Promise<Adherent> {
  return apiRequest<Adherent>("/adherents", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* Modifier un adhérent */
export async function updateAdherent(
  id: number,
  data: UpdateAdherentDto,
): Promise<Adherent> {
  return apiRequest<Adherent>(`adherents/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* Soft Delete d'un adherent par son id */
export async function deleteAdherent(id: number): Promise<void> {
  return apiRequest<void>(`/adherents/${id}`, {
    method: "DELETE",
  });
}
