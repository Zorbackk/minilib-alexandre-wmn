// frontend/src/hooks/useLivres.ts
// Custom hook : centralise les appels API et les états (data, loading, error) liés aux livres
import { useState, useEffect } from "react";
import { getLivres } from "../services/livreService";
import type { Livre } from "../types";
export function useLivres() {
  // Les trois états possibles d'un appel asynchrone 
  const [data, setData] = useState<Livre[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  // S'exécute une seule fois au montage du composant
  // Tableau de dépendances vide
  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);
  // Expose les données et les états au composant appelant
  return { data, isLoading, error };
}
