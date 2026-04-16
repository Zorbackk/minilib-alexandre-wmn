// frontend/src/components/EmpruntCard.tsx 
import type { EmpruntAvecDetails } from "../../types";

interface EmpruntCardProps {
  // Bonne pratique 
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly emprunt : EmpruntAvecDetails;
};

function EmpruntCard({ emprunt } : EmpruntCardProps)  {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "16px",
      backgroundColor: "#fff",
      marginBottom: "12px",
    }}>
      <h3 style={{marginBottom: "4px"}}>
        Emprunt réalise le {emprunt.date_emprunt}
      </h3>
      <p style={{color: "#555", fontSize: "14px"}}>
        {emprunt.titre_livre} par {emprunt.nom_adherent}
      </p>
        <p style={{ fontSize: "13px", color: "#888"}}>
          Retour prévue le {emprunt.date_retour_prevue} 
        </p>
      <span style={{
        display: "inline-block",
        marginTop: "8px",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: emprunt.en_retard ? "#E8F5E9" : "#FFEBEE",
        color: emprunt.en_retard ? "#1B5E20" : "#B71C1C",
      }}> {/*Opérateur ternaire : SI actif est TRUE alors vert SINON rouge*/}
        {emprunt.en_retard ? "À rendre" : "Délai dépassé"}
      </span>
    </div>
  );
}

export default EmpruntCard;