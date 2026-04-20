// frontend/src/components/forms/LivreForm.tsx
// Formulaire qui va gérer CREATE et UPDATE des livres

import type { Livre, CreateLivreDto } from "../../types";
import { useState } from "react";


interface LivreFormProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  // On met ? au livre car si on est en création on n'est pas OBLIGÉ de lire l'objet Livre
  // Pré-remplit les champs si modification, sinon valeurs vides (création)
  readonly livre?: Livre;

  // Fonction à passer lors de la soumission du formulaire
  readonly createLivre: (data: CreateLivreDto) => void;
}

// On destructure soit l'objet à modifier (livre) soit la fonction à appeler lors de la création
export function LivreForm({ livre, createLivre }: LivreFormProps) {
  // Afin de prévoir le cas de création ou de modification le useState prends les deux cas en possibilités
  // Lire : isbn: si Livre alors on prends la valeur de la propriété cherchée dans le form sinon une chaine vide (cas de la création)
  const [formData, setFormData] = useState({
    isbn: livre?.isbn ?? "",
    titre: livre?.titre ?? "",
    auteur: livre?.auteur ?? "",
    annee: livre?.annee ?? undefined,
    genre: livre?.genre ?? "",
  });

  function handleSubmit(e: React.SubmitEvent) {
    // Empêche le rechargement de page par défaut du navigateur
    e.preventDefault();
    // Transmet les données du formulaire au composant parent
    createLivre(formData)
  }

  return (
    <form
    onSubmit={handleSubmit}
    >
      <label htmlFor="isbn">Entrez l'ISBN du livre</label>
      <input
        type="text"
        id="isbn"
        value={formData.isbn}
        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        required
      />
      <label htmlFor="titre">Entrez le titre du livre</label>
      <input
        type="text"
        id="titre"
        value={formData.titre}
        onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
        required
      />
      <label htmlFor="auteur">Renseignez l'auteur du livre</label>
      <input
        type="text"
        id="auteur"
        value={formData.auteur}
        onChange={(e) => setFormData({ ...formData, auteur: e.target.value })}
        required
      />
      <label htmlFor="annee">Indiquez l'année de sortie</label>
      <input
        type="number"
        id="annee"
        value={formData.annee}
        onChange={(e) =>
          setFormData({
            ...formData,
            annee: e.target.value ? Number.parseInt(e.target.value) : undefined,
          })
        }
      />
      <label htmlFor="genre">Renseignez le genre du livre</label>
      <input
        type="text"
        id="genre"
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
      />

      <input type="submit" value="Valider" />
    </form>
  );
}
