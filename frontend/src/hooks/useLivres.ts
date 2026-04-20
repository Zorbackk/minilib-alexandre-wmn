// frontend/src/hooks/useLivres.ts
// Custom hook : centralise les appels API et les états (data, loading, error) liés aux livres
import { useState, useEffect, useCallback } from "react";
import { getLivres, creerLivre } from "../services/livreService";
import type { CreateLivreDto, Livre } from "../types";
export function useLivres() {
  // Les trois états possibles d'un appel asynchrone
  const [data, setData] = useState<Livre[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  // Sortie du useEffect pour être réutilisée avec creerLivre
  // Ne s'exécute qu'une fois []
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getLivres();
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      // Toujours exécuté, qu'il y ait une erreur ou non
      setIsLoading(false);
    }
  }, []);

  // S'exécute une seule fois au montage du composant
  // Malgré que fetchData en dépendance, mais fetchData ne s'exécute qu'une fois
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Crée un livre via le service puis rafraîchit la liste
  const handleCreate = async (data: CreateLivreDto) => {
    await creerLivre(data);
    await fetchData(); // Rafraîchit la liste
  };

  // Expose les données et les états au composant appelant
  return { data, isLoading, error, handleCreate };
}
