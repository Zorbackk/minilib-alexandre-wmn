// frontend/src/components/SearchBarLivres.tsx
interface SearchBarLivresProps {
  readonly onRecherche: (valeur: string ) => void;
  readonly valeur: string; 
}

function SearchBarLivres({ onRecherche, valeur } : SearchBarLivresProps) {
  return (
    <div>
      <input type="text" onChange={(e) => onRecherche(e.target.value)} value={valeur}/>
      <button onClick={() => onRecherche("")}>Reset</button>
    </div>
  );
}

export default SearchBarLivres;