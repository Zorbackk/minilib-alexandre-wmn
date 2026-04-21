// frontend/src/pages/LivresPage.tsx
// TODO 04 : Clean le code et les commentaires pour correspondre à Adherents et plus Livres + Améliorer le composant
import { useState, useEffect, useCallback } from "react";
import type { Adherent, CreateAdherentDto, UpdateAdherentDto } from "../types";
import {
  getAdherents,
  createAdherent,
  updateAdherent,
  deleteAdherent,
} from "../services/adherentService";
import AdherentCard from "../components/cards/AdherentCard";
import { AdherentForm } from "../components/forms/AdherentForm";
import "./Spinner.css";

function AdherentsPage() {
  // useState<Type>(valeurInitiale) → retourne [valeur, setter]
  // Chaque appel au setter modifie l'état et déclenche un re-render
  // Les 3 états pour tout fetch: données, chargement, erreur
  const [adherents, setAdherents] = useState<Adherent[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [adherentSelectionne, setAdherentSelectionne] = useState<Adherent | null>(null)

  const fetchData = useCallback(() => {
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
      } catch (err) {
        setErreur(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        // finally s'exécute toujours, succès ou erreur
        setChargement(false);
      }
    }, 500);
    // Cleanup : React appelle cette fonction avant chaque re-déclenchement du useEffect
    // Si l'utilisateur retape avant 500ms, le timer précédent est annulé
    return () => clearTimeout(timer);
  }, []);

  // S'exécute une seule fois au montage du composant
  // Malgré que fetchData en dépendance, mais fetchData ne s'exécute qu'une fois
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fonction pour supprimer un livre avec l'id en paramètre
  async function handleDelete(id: number) {
  // Appel de la méthode de suppression depuis le service
  await deleteAdherent(id);
  // Met à jour l'état local en retirant l'adhérent supprimé du tableau
  setAdherents(adherents.filter((a) => a.id !== id));
  }

  // Fonction pour stocker l'adhérent sélectionné et ouvrir le modal
  function handleEdit(adherent: Adherent) {
    setAdherentSelectionne(adherent);
    setIsOpen(true);
  }

  // Fonction pour créer un adhérent, utilise la méthode du service
  // Rafraîchissement de la page via fetchData, callback du useEffect
  const handleCreate = async (data: CreateAdherentDto) => {
    await createAdherent(data);
    fetchData(); // Rafraîchit la liste
    setIsOpen(false); // Ferme modal
  }

  // Fonction pour modifier un livre, utilise la méthode du service
  // Rafraîchissement via fetchData, callBack du useEffect
  const handleUpdate = async (id: number, data: UpdateAdherentDto) => {
    await updateAdherent(id, data);
    fetchData(); // Rafraîchit la liste
    setIsOpen(false); // Ferme modal
  }

  // Rendu conditionnel -----------------------------
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
      <h1>
        Liste de{adherents.length > 1 ? "s" : ""} adhérent
        {adherents.length > 1 ? "s" : ""}
      </h1>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        {adherents.length} adhérent{adherents.length > 1 ? "s" : ""} inscrit
        {adherents.length > 1 ? "s" : ""}.
      </p>
      <button onClick={() => {
        setAdherentSelectionne(null); // Assure le mode création
        setIsOpen(true); // Ouvre modal
      }}>Ajouter un adhérent</button>
      {adherents.length === 0 ? (
        <p>Aucun adherent inscrit.</p>
      ) : (
        adherents.map((adherent) => (
          <AdherentCard key={adherent.id} adherent={adherent} onDelete={handleDelete} onEdit={handleEdit}/>
        ))
      )}
      {isOpen && (
        <AdherentForm 
        adherent={adherentSelectionne}
        createAdherent={handleCreate}
        updateAdherent={(data) => handleUpdate(adherentSelectionne!.id, data)}
        />
      )}
    </div>
  );
}

export default AdherentsPage;
