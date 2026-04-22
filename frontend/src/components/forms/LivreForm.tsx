// frontend/src/components/forms/LivreForm.tsx
// Formulaire qui va gérer CREATE et UPDATE des livres
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import type { Livre, CreateLivreDto, UpdateLivreDto } from "../../types";
import { useState } from "react";

interface LivreFormProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  // On met ? au livre car si on est en création on n'est pas OBLIGÉ de lire l'objet Livre
  // Pré-remplit les champs si modification, sinon valeurs vides (création)
  readonly livre?: Livre | null;

  // Fonction à passer lors de la soumission du formulaire
  readonly createLivre: (data: CreateLivreDto) => void;

  readonly updateLivre?: (data: UpdateLivreDto) => void;

  readonly isOpen: boolean;
  readonly onClose: () => void;
}

// On destructure soit l'objet à modifier (livre) soit la fonction à appeler lors de la création
// Ainsi que les autres fonctions des props
export function LivreForm({
  livre,
  createLivre,
  updateLivre,
  isOpen,
  onClose,
}: LivreFormProps) {
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

    if (livre) {
      // On ne sélectionne que les champs qui nous intéressent
      const updateData = {
        titre: formData.titre,
        auteur: formData.auteur,
        annee: formData.annee,
        genre: formData.genre,
      };
      updateLivre?.(updateData);
    } else {
      // Transmet les données du formulaire au composant parent
      createLivre(formData);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {livre ? "Modifier le livre" : "Ajouter un livre"}
            </DialogTitle>
                        <DialogDescription>Veuillez remplir les champs</DialogDescription>

          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="isbn">Entrez l'ISBN du livre</Label>
              <Input
                type="text"
                id="isbn"
                value={formData.isbn}
                onChange={(e) =>
                  setFormData({ ...formData, isbn: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <Label htmlFor="titre">Entrez le titre du livre</Label>
              <Input
                type="text"
                id="titre"
                value={formData.titre}
                onChange={(e) =>
                  setFormData({ ...formData, titre: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <Label htmlFor="auteur">Renseignez l'auteur du livre</Label>
              <Input
                type="text"
                id="auteur"
                value={formData.auteur}
                onChange={(e) =>
                  setFormData({ ...formData, auteur: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <Label htmlFor="annee">Indiquez l'année de sortie</Label>
              <Input
                type="number"
                id="annee"
                value={formData.annee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annee: e.target.value
                      ? Number.parseInt(e.target.value)
                      : undefined,
                  })
                }
              />
            </Field>
            <Field>
              <Label htmlFor="genre">Renseignez le genre du livre</Label>
              <Input
                type="text"
                id="genre"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
              />
              <Input type="submit" value="Valider" />
            </Field>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  );
}
