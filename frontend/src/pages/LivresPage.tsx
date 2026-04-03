// frontend/src/pages/LivresPage.tsx
import { useState, useEffect } from "react";
import type { Livre } from "../types";
import { getLivres } from "../services/livreService";
import LivreCard from "../components/LivreCard"
import SearchBarLivres from "../components/SearchBarLivres";

function LivresPage() {
  // useState<Type>(valeurInitiale) → retourne [valeur, setter]
  // Chaque appel au setter modifie l'état et déclenche un re-render
  // Les 3 états pour tout fetch: données, chargement, erreur
  const [livres, setLivres] = useState<Livre[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState<string>("")

  // useEffect(callback, [dépendances]) → exécute le callback après le rendu
  // [] = se déclenche une seule fois au montage du composant
  // Si on mettait [recherche], ça se relancerait à chaque changement de recherche
  // Chargement au montage du composant
  useEffect(() => {
    // useEffect ne peut pas être async directement → fonction interne async
    const chargerLivre = async () => {
      try {
        setChargement(true);
        setErreur(null);
        const data = await getLivres({recherche : recherche});
        setLivres(data);
      } catch(err) {
        setErreur(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        // finally s'exécute toujours, succès ou erreur
        setChargement(false);
      }
    };

    chargerLivre();
  }, [recherche]); // une seule fois au montage

// Rendu conditionnel -----------------------------
if (chargement) {
  return <p>Chargement du catalogue...</p>
}

if (erreur) {
  return (
    <div>
      <p style={{color: "red"}}> Erreur : {erreur}</p>
      <p>Vérifiez que le backend tourne sur http://localhost:5000</p>
    </div>
  );
}

return (
  <div>
    <h1>Catalogue de livres</h1>
    <p style={{ marginBottom: "16px", color: "#555"}}>
      {livres.length} livre{livres.length > 1 ? "s" : ""} dans la bibliothèque.
    </p>
    <p><SearchBarLivres onRecherche={setRecherche}/></p>
      {livres.length === 0 ? (
        <p>Aucun livre dans le catalogue.</p>
      ) : (
        livres.map((livre) => (
          <LivreCard key={livre.id} livre={livre} />
        ))
      )}
  </div>
);
}

export default LivresPage;