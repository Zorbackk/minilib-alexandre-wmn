// frontend/src/components/SearchBarLivres.tsx
interface SearchBarLivresProps {
  readonly onRecherche: (valeur: string ) => void; 
}

function SearchBarLivres({ onRecherche } : SearchBarLivresProps) {
  return (
    <div>
      <input type="text" onChange={(e) => onRecherche(e.target.value)}/>
    </div>
  );
}

export default SearchBarLivres;