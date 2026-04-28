// frontend/src/components/EmpruntCard.tsx
import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import type { EmpruntAvecDetails } from "../../types";
import { formatDate } from "../../utils/formatDate.ts";

interface EmpruntCardProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly emprunt: EmpruntAvecDetails;

  readonly onDelete: (id: number) => void; // Retour d'un emprunt via son id
}

// Fonction pour définir le statut de l'emprunt
// On prend l'objet étendu pour accéder à la boolean en_retard
// On applique directement le style par la même occasion
function getStatus(emprunt: EmpruntAvecDetails) {
  if (emprunt.date_retour_effective !== null) {
    return {
      label: "Rendu",
      classes: "bg-green-50 text-green-700 border-green-200",
    };
  }
  if (emprunt.en_retard) {
    return {
      label: "En retard",
      classes: "bg-red-50 text-red-700 border-red-200",
    };
  }
  return {
    label: "À rendre",
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  };
}

function EmpruntCard({ emprunt, onDelete }: EmpruntCardProps) {
  const statut = getStatus(emprunt);
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground">
            {emprunt.titre_livre}
          </h3>
          <p className="text-sm text-muted-foreground">
            par {emprunt.nom_adherent}
          </p>
          <p className="text-xs text-muted-foreground">
            {/* Utilitaire de conversion de la date formatDate()*/}
            Emprunté le {formatDate(emprunt.date_emprunt)} · Retour prévu le{" "}
            {formatDate(emprunt.date_retour_prevue)}
          </p>
          {emprunt.date_retour_effective !== null && (
            <p className="text-xs text-muted-foreground">
              Retour effectué le {formatDate(emprunt.date_retour_effective)}
            </p>
          )}
        </div>
        {/*La fonction est mise en constant pour appeler ses paramètres là où en as besoin*/}
        <span
          className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statut.classes}`}
        >
          {statut.label}
        </span>
      </div>
      <div className="flex justify-end pt-1">
        {/* Arrow fonction pour empêcher l'exécution directe*/}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(emprunt.id)}
        >
          <Undo2 />
          Effectuer un retour
        </Button>
      </div>
    </div>
  );
}

export default EmpruntCard;
