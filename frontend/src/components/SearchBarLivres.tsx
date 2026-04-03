// frontend/src/components/SearchBarLivres.tsx
// La barre de recherche est placée à part pour séparer les préoccupations
interface SearchBarLivresProps {
  // onRecherche = fonction callback passée par le parent
  // Elle reçoit la valeur tapée et met à jour recherche dans LivresPage
  readonly onRecherche: (valeur: string ) => void;
  readonly valeur: string; 
}

// Déstructuration des props : on extrait directement onRecherche et valeur
function SearchBarLivres({ onRecherche, valeur } : SearchBarLivresProps) {
  return (
    <div>
      {/*onChange = fonction event qui va chercher la valeur de saisie*/}
      {/*value = ce qui rend l'input contrôlé par React : la valeur affichée est dictée par le state recherche */}
      <input type="text" onChange={(e) => onRecherche(e.target.value)} value={valeur}/>
      {/*onClick = au clic realance une recherche vide*/}
      <button onClick={() => onRecherche("")}>Reset</button>
    </div>
  );
}

export default SearchBarLivres;