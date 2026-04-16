// frontend/src/pages/LivresPage.tsx
// TODO 04 : Clean le code et les commentaires pour correspondre à Adherents et plus Livres + Améliorer le composant
import { useState, useEffect } from "react";
import type { Adherent } from "../types";
import { getAdherents } from "../services/adherentService";
import AdherentCard from "../components/cards/AdherentCard";
import './Spinner.css'

function AdherentsPage() {
  // useState<Type>(valeurInitiale) → retourne [valeur, setter]
  // Chaque appel au setter modifie l'état et déclenche un re-render
  // Les 3 états pour tout fetch: données, chargement, erreur
  const [adherents, setAdherents] = useState<Adherent[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);


  useEffect(() => {
// useEffect ne peut pas être async directement → fonction interne async
// useEffect sert à déclencher l'appel API - setAdherents provoque l'affichage
// Recherche en dépendance = déclenchement à la saisie utilisateur
    const timer = setTimeout(async () => {
      // Debounce : attend 500ms après la dernière saisie avant d'appeler l'API
      // Evite d'envoyer une requête à chaque frappe clavier
      try {
        setChargement(true);
        setErreur(null);
        // TODO 02 : retirer après test du spinner
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getAdherents();
        setAdherents(data);
      } catch(err) {
        setErreur(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        // finally s'exécute toujours, succès ou erreur
        setChargement(false);
      }
    }, 500);
    // Cleanup : React appelle cette fonction avant chaque re-déclenchement du useEffect
    // Si l'utilisateur retape avant 500ms, le timer précédent est annulé
    return () => clearTimeout(timer);
  // Les deux filtres en dépendance : se re-déclenche si l'un ou l'autre change
  }, []
)

// Rendu conditionnel -----------------------------
if (chargement) {
  return <p className="loader"></p>
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
    <h1>Liste de{adherents.length > 1 ? "s" : ""} adhérent{adherents.length > 1 ? "s" : ""}</h1>
    <p style={{ marginBottom: "16px", color: "#555"}}>
      {adherents.length} adhérent{adherents.length > 1 ? "s" : ""} inscrit{adherents.length > 1 ? "s" : ""}.
    </p>
      {adherents.length === 0 ? (
        <p>Aucun adherent inscrit.</p>
      ) : (
        adherents.map((adherent) => (
          <AdherentCard key={adherent.id} adherent={adherent} />
        ))
      )}
  </div>
);
}

export default AdherentsPage;