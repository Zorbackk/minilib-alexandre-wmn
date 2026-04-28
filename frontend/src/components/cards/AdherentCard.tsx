// frontend/src/components/AdherentCard.tsx
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import type { Adherent } from "../../types";

interface AdherentCardProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly adherent: Adherent;
  readonly onDelete: (id: number) => void; // suppression d'un adhérent selon son id
  readonly onEdit: (adherent: Adherent) => void; // modification d'un adhérent via l'objet
}

function AdherentCard({ adherent, onDelete, onEdit }: AdherentCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground">
            {adherent.prenom} {adherent.nom} 
          </h3>
          <p className="text-sm text-muted-foreground">{adherent.email}</p>
          <p className="text-xs text-muted-foreground">#{adherent.numero_adherent}</p>
        </div>
        {/*Opérateur ternaire : SI actif est TRUE alors vert SINON rouge*/}
        <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          adherent.actif
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          {adherent.actif ? "Actif" : "Inactif"}
        </span>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <Button variant="outline" size="sm" onClick={() => onEdit(adherent)}>
          <Pencil />
          Modifier
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(adherent.id)}>
          <Trash2 />
          Supprimer
        </Button>
      </div>
    </div>
  );
}

export default AdherentCard;
