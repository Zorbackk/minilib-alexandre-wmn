// frontend/src/components/AdherentCard.tsx 
import type { Adherent } from "../types";

interface AdherentCardProps {
  // Bonne pratique 
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly adherent: Adherent;
};

function AdherentCard({ adherent } : AdherentCardProps)  {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "16px",
      backgroundColor: "#fff",
      marginBottom: "12px",
    }}>
      <h3 style={{marginBottom: "4px"}}>
        {adherent.numero_adherent}
      </h3>
      <p style={{color: "#555", fontSize: "14px"}}>
        {adherent.nom}
        {adherent.prenom}
      </p>
        <p style={{ fontSize: "13px", color: "#888"}}>
          {adherent.email} 
        </p>
      <span style={{
        display: "inline-block",
        marginTop: "8px",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: adherent.actif ? "#E8F5E9" : "#FFEBEE",
        color: adherent.actif ? "#1B5E20" : "#B71C1C",
      }}> {/*Opérateur ternaire : SI actif est TRUE alors vert SINON rouge*/}
        {adherent.actif ? "Actif" : "Inactif"}
      </span>
    </div>
  );
}

export default AdherentCard;