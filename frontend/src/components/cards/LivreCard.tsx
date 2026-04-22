// frontend/src/components/LivreCard.tsx
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import type { Livre } from "../../types";

interface LivreCardProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly livre: Livre;
  readonly onDelete: (id: number) => void; // suppression d'un livre via son id
  readonly onEdit: (livre: Livre) => void; // modification d'un livre via l'objet
}

function LivreCard({ livre, onDelete, onEdit }: LivreCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground">{livre.titre}</h3>
          <p className="text-sm text-muted-foreground">
            {livre.auteur}{livre.annee ? ` — ${livre.annee}` : ""}
          </p>
          {livre.genre && (
            <p className="text-xs text-muted-foreground">{livre.genre}</p>
          )}
        </div>
        {/*Opérateur ternaire : SI actif est TRUE alors vert SINON rouge*/}
        <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          livre.disponible
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          {livre.disponible ? "Disponible" : "Emprunté"}
        </span>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <Button variant="outline" size="sm" onClick={() => onEdit(livre)}>
          <Pencil />
          Modifier
        </Button>
        {/* Arrow fonction pour empêcher l'exécution directe*/}
        <Button variant="destructive" size="sm" onClick={() => onDelete(livre.id)}>
          <Trash2 />
          Supprimer
        </Button>
      </div>
    </div>
  );
}

export default LivreCard;