// frontend/src/components/forms/EmpruntsForm.tsx
// Formulaire qui va gérer CREATE et UPDATE des adhérents
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import type { CreateEmpruntDto, Adherent, Livre } from "../../types";
import { useState } from "react";

interface EmpruntFormProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit

  readonly livre: Livre[];

  readonly adherent: Adherent[];
  readonly createEmprunt: (data: CreateEmpruntDto) => void;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

// On destructure soit l'objet à modifier (adherent) soit la fonction à appeler lors de la création
// Ainsi que les autres fonctions des props
export function EmpruntForm({
  livre,
  adherent,
  createEmprunt,
  isOpen,
  onClose,
}: EmpruntFormProps) {
  const [formData, setFormData] = useState<CreateEmpruntDto>({
    livre_id: null,
    adherent_id: null,
  });

  // Fonction de soumission du formulaire avec anti-rechargement
  function handleSubmit(e: React.SubmitEvent) {
    // Empêche le rechargement de page par défaut du navigateur
    e.preventDefault();
    createEmprunt(formData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-primary-foreground">
        <DialogHeader>
          <DialogTitle>Saisir un emprunt</DialogTitle>
          <DialogDescription>
            Veuillez choisir le livre emprunté puis l'adhérent
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="livre">Sélection du livre</Label>
              {/* On convertit les données transmises au backend en number*/}
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, livre_id: Number(val) })
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-primary-foreground">
                  <SelectGroup>
                    <SelectLabel>Livres</SelectLabel>
                    {/* On convertit les données transmises au formulaire en string*/}
                    {livre.map((livre) => (
                      <SelectItem key={livre.id} value={String(livre.id)}>
                        {livre.titre}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="adherent">Sélection de l'adhérent</Label>
              {/* On convertit les données transmises au backend en number*/}
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, adherent_id: Number(val) })
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-primary-foreground">
                  <SelectGroup>
                    <SelectLabel>Adhérents</SelectLabel>
                    {/* On convertit les données transmises au formulaire en string*/}
                    {adherent.map((adherent) => (
                      <SelectItem key={adherent.id} value={String(adherent.id)}>
                        {adherent.prenom} {adherent.nom}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <input type="submit" value="Valider" />
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
