// frontend/src/pages/EmpruntsPage.tsx

import { useState, useEffect, useCallback } from "react";
import type {
  Adherent,
  Livre,
  CreateEmpruntDto,
  EmpruntAvecDetails,
} from "../types";
import {
  createEmprunt,
  getEmprunts,
  getNonRendus,
  getRetards,
  setEndEmprunt,
} from "../services/empruntsService";
import EmpruntCard from "../components/cards/EmpruntCard";
import SelectEmprunts from "../components/searchingComponents/SelectEmprunts";
import "./Spinner.css";
import { EmpruntForm } from "@/components/forms/EmpruntForm";
import { getAdherents } from "@/services/adherentService";
import { getLivres } from "@/services/livreService";

// Fonction utilitaire pour déterminer quelle méthode du service utiliser dans le useEffect
// Sert pour le SelectEmprunts
async function getStatus(inTime: boolean | undefined) {
  if (inTime == null) {
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
  const [livres, setLivres] = useState<Livre[]>([]);
  const [adherents, setAdherents] = useState<Adherent[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);
  // undefined = undefined(tous les emprunts, true = dans les temps, false = en retard)
  const [inTime, setInTime] = useState<boolean | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    // useEffect ne peut pas être async directement → fonction interne async
    // useEffect sert à déclencher l'appel API - setLivres provoque l'affichage
    const chargerEmprunts = async () => {
      try {
        setChargement(true);
        setErreur(null);
        // Ici on passe la fonction utilitaire qui vérifie l'état de l'emprunt avant le render
        const data = await getStatus(inTime);
        setEmprunts(data);
      } catch (err) {
        setErreur(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    };
    chargerEmprunts();
  }, [inTime]);

  // S'exécute une seule fois au montage du composant
  // Malgré que fetchData en dépendance, mais fetchData ne s'exécute qu'une fois
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch les datas de Livres et Adhérents, une seule fois
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [livresData, adherentsData] = await Promise.all([
          getLivres(),
          getAdherents(),
        ]);
        setLivres(livresData);
        setAdherents(adherentsData);
      } catch (error) {
        setErreur(error instanceof Error ? error.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    };
    fetchData();
  }, []); // Ne s'exécute que pour charger les datas

  // Fonction pour effectuer un retour avec l'id en paramètre
  async function handleDelete(id: number) {
    // Appel de la méthode de suppression depuis le service
    await setEndEmprunt(id);
    // Met à jour l'état local en retirant le livre supprimé du tableau
    setEmprunts(emprunts.filter((e) => e.id !== id));
  }

  // Fonction pour réaliser un emprunt, utilise la méthode du service
  // Rafraîchissement via fetchData, callBack du useEffect
  const handleCreate = async (data: CreateEmpruntDto) => {
    await createEmprunt(data);
    fetchData();
    setIsOpen(false);
  };

  // Rendu conditionnel -------------------------------------------------------------------------------
  if (chargement) {
    return <p className="loader"></p>;
  }

  if (erreur) {
    return (
      <div>
        <p style={{ color: "red" }}> Erreur : {erreur}</p>
        <p>Vérifiez que le backend tourne sur http://localhost:5000</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Gestionnaire des emprunts</h1>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        {emprunts.length} emprunt{emprunts.length > 1 ? "s" : ""} réalisé
        {emprunts.length > 1 ? "s" : ""}
      </p>
      <button
        onClick={() => {
          setIsOpen(true); // Ouvre modal
        }}
      >
        Réaliser un emprunt
      </button>
      <SelectEmprunts onFiltreBorrowed={setInTime} filtreBorrowed={inTime} />
      {emprunts.length === 0 ? (
        <p>Aucun emprunt réalisé</p>
      ) : (
        emprunts.map((emprunt) => (
          <EmpruntCard
            key={emprunt.id}
            emprunt={emprunt}
            onDelete={handleDelete}
          />
        ))
      )}
      {isOpen && (
        <EmpruntForm
          livre={livres}
          adherent={adherents}
          createEmprunt={handleCreate}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default EmpruntsPage;
