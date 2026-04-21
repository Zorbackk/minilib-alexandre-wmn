// frontend/src/components/forms/AdherentForm.tsx
// Formulaire qui va gérer CREATE et UPDATE des adhérents

import type {
  Adherent,
  CreateAdherentDto,
  UpdateAdherentDto,
} from "../../types";
import { useState } from "react";

interface AdherentFormProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  // On met ? au adherent car si on est en création on n'est pas OBLIGÉ de lire l'objet Adherent
  // Pré-remplit les champs si modification, sinon valeurs vides (création)
  readonly adherent?: Adherent | null;
  readonly createAdherent: (data: CreateAdherentDto) => void;
  readonly updateAdherent: (data: UpdateAdherentDto) => void;
}

// On destructure soit l'objet à modifier (adherent) soit la fonction à appeler lors de la création
// Ainsi que les autres fonctions des props
export function AdherentForm({
  adherent,
  createAdherent,
  updateAdherent,
}: AdherentFormProps) {
  // Afin de prévoir le cas de création ou de modification le useState prends les deux cas en possibilités
  const [formData, setFormData] = useState({
    nom: adherent?.nom ?? "",
    prenom: adherent?.prenom ?? "",
    email: adherent?.email ?? "",
  });

  function handleSubmit(e: React.SubmitEvent) {
    // Empêche le rechargement de page par défaut du navigateur
    e.preventDefault();

    if (adherent) {
      // On prend ici le formeData car les données seront les mêmes en modification ou création
      updateAdherent?.(formData);
    } else {
      createAdherent(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prenom">Entrez le prénom de l'adhérent</label>
      <input
        type="text"
        id="prenom"
        value={formData.prenom}
        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
        required
      />
      <label htmlFor="titre">Entrez le nom de l'adhérent</label>
      <input
        type="text"
        id="nom"
        value={formData.nom}
        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
        required
      />
      <label htmlFor="email">Entrez l'email de l'adhérent</label>
      <input
        type="text"
        id="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input type="submit" value="Valider" />
    </form>
  );
}
