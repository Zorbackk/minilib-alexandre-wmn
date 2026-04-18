// frontend/src/pages/EmpruntsPage.tsx

import { useState, useEffect } from "react";
import type { EmpruntAvecDetails } from "../types";
import { getEmprunts, getNonRendus,getRetards } from "../services/empruntsService";
import EmpruntCard from "../components/cards/EmpruntCard";
import SelectEmprunts from "../components/searchingComponents/SelectEmprunts";
import './Spinner.css'

// Fonction utilitaire pour déterminer quelle méthode du service utiliser dans le useEffect 
// Sert pour le SelectEmprunts
async function getStatus(inTime : boolean | undefined) {
if (inTime == null ) {
  return await getEmprunts();
}
if (inTime === true) {
  return await getNonRendus();
}
  return await getRetards();
} 

function EmpruntsPage() {
  // useState<Type>(valeurInitiale) → retourne [valeur, setter]
  // Chaque appel au setter modifie l'état et déclenche un re-render
  // Les 3 états pour tout fetch: données, chargement, erreur
  const [emprunts, setEmprunts] = useState<EmpruntAvecDetails[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);
  // undefined = undefined(tous les emprunts, true = dans les temps, false = en retard)
  const [inTime, setInTime] = useState<boolean | undefined>(undefined);

useEffect(() => {
// useEffect ne peut pas être async directement → fonction interne async
// useEffect sert à déclencher l'appel API - setLivres provoque l'affichage
const chargerEmprunts = async () => {
  try {
    setChargement(true);
    setErreur(null);
    // Ici on passe la fonction utilitaire qui vérifie l'état de l'emprunt avant le render
    const data = await getStatus(inTime);
    setEmprunts(data);
  } catch(err) {
    setErreur(err instanceof Error ? err.message : "Erreur inconnue");
  } finally {
    setChargement(false);
  }
};
  chargerEmprunts();
}, [inTime]
)

// Rendu conditionnel -------------------------------------------------------------------------------
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
    <h1>Gestionnaire des emprunts</h1>
    <p style={{ marginBottom: "16px", color: "#555"}}>
      {emprunts.length} emprunt{emprunts.length > 1 ? "s" : ""} réalisé{emprunts.length > 1 ? "s" : ""}
    </p>
    <SelectEmprunts onFiltreBorrowed={setInTime} filtreBorrowed={inTime}/>
    {emprunts.length === 0 ? (
      <p>Aucun emprunt réalisé</p>
    ) : (
      emprunts.map((emprunt) => (
        < EmpruntCard key={emprunt.id} emprunt={emprunt} />
      ))
    )}
  </div>
);
}

export default EmpruntsPage;