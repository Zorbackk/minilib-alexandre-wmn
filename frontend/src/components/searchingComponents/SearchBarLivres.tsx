// frontend/src/components/SearchBarLivres.tsx
// La barre de recherche est placée à part pour séparer les préoccupations
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchBarLivresProps {
  // onRecherche = fonction callback passée par le parent
  // Elle reçoit la valeur tapée et met à jour recherche dans LivresPage
  readonly onRecherche: (valeur: string) => void;
  readonly valeur: string;
  readonly onFiltreDisponible: (valeur: boolean | undefined) => void;
  readonly filtreDisponible: boolean | undefined;
}

// Conversion string → boolean | undefined
// Le <select> renvoie toujours une string, on la convertit pour getLivres
function isAvailable(valeur: string): boolean | undefined {
  if (valeur === "true") return true;
  if (valeur === "false") return false;
  return undefined; // "tous" → pas de filtre
}

// Conversion inverse : boolean | undefined → string
// Permet au select d'afficher la bonne option quand le composant se remonte
// (sinon le select repassait à "Tous" à chaque rechargement)
function isSelected(valeur: boolean | undefined): string {
  if (valeur === true) return "true";
  if (valeur === false) return "false";
  return "tous";
}

// Déstructuration des props : on extrait directement onRecherche et valeur
function SearchBarLivres({
  onRecherche,
  valeur,
  onFiltreDisponible,
  filtreDisponible,
}: SearchBarLivresProps) {
  return (
    <div className="flex gap-2 items-center">
      {/*onChange = fonction event qui va chercher la valeur de saisie*/}
      {/*value = ce qui rend l'input contrôlé par React : la valeur affichée est dictée par le state recherche */}
      <Input
        type="text"
        placeholder="Rechercher par titre ou auteur…"
        onChange={(e) => onRecherche(e.target.value)}
        value={valeur}
        className="max-w-xs"
      />
      {/* value contrôlé par le parent via filtreDisponible → isSelected convertit boolean|undefined en string */}

      <select
        value={isSelected(filtreDisponible)}
        onChange={(e) => onFiltreDisponible(isAvailable(e.target.value))}
        className="h-8 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="tous">Tous</option>
        <option value="true">Disponibles</option>
        <option value="false">Empruntés</option>
      </select>
      {/*onClick = au clic realance une recherche vide*/}
      <Button variant="ghost" size="sm" onClick={() => onRecherche("")}>
        <X />
        Reset
      </Button>
    </div>
  );
}

export default SearchBarLivres;
