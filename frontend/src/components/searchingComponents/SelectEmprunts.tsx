// frontend/src/SearchBarEmprunts.tsx
// Composant servant à distinguer l'ensemble des emprunts, ceux en cours, ceux hors délai

interface SelectEmpruntsProps {
  readonly onFiltreBorrowed: (valeur: boolean | undefined) => void;
  readonly filtreBorrowed: boolean | undefined;
}

// Conversion string → boolean | undefined
// Le <select> renvoie toujours une string, on la convertit pour getEmprunts
function isOnTime(valeur: string): boolean | undefined {
  if (valeur === "true") return true;
  if (valeur === "false") return false;
  return undefined; // tous les emprunts sans distinction
}

// Conversion inverse : boolean | undefined → string
// Permet au select d'afficher la bonne option quand le composant se remonte
// (sinon le select repassait à "Tous" à chaque rechargement)
function isSelected(valeur: boolean | undefined): string {
  if (valeur === true) return "true";
  if (valeur === false) return "false";
  return "tous";
}

function SelectEmprunts({
  onFiltreBorrowed,
  filtreBorrowed,
}: SelectEmpruntsProps) {
  return (
    <div>
      <select
        value={isSelected(filtreBorrowed)}
        onChange={(e) => {
          onFiltreBorrowed(isOnTime(e.target.value));
        }}
      >
        <option value="tous">Tous</option>
        <option value="true">Non-rendus</option>
        <option value="false">En retard</option>
      </select>
    </div>
  );
}

export default SelectEmprunts;
