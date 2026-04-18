// frontend/src/components/EmpruntCard.tsx 
import type { EmpruntAvecDetails } from "../../types";
import { formatDate } from "../../utils/formatDate.ts"
interface EmpruntCardProps {
  // Bonne pratique 
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly emprunt : EmpruntAvecDetails;
};

// Fonction pour définir le statut de l'emprunt 
// On prendre l'objet étendu pour accéder à la boolean en_retard
function getStatus( EmpruntAvecDetails: EmpruntAvecDetails) {
if (EmpruntAvecDetails.date_retour_effective !== null ) {
  return ("rendu");
}
if (EmpruntAvecDetails.en_retard) {
  return ("en retard");
}
  return ("a rendre")
}

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
        {/* Utilitaire de conversion de la date formatDate()*/}
        Emprunt réalisé le {formatDate(emprunt.date_emprunt)}
      </h3>
      <p style={{color: "#555", fontSize: "14px"}}>
        {emprunt.titre_livre} par {emprunt.nom_adherent}
      </p>
        <p style={{ fontSize: "13px", color: "#888"}}>
          Retour prévue le {formatDate(emprunt.date_retour_prevue)} 
        </p>
        {emprunt.date_retour_effective !== null && 
        (<p style={{ fontSize: "13px", color: "#888"}}>
          Retour effectué le {formatDate(emprunt.date_retour_effective)} 
        </p>)
        }
      <span style={{
        display: "inline-block",
        marginTop: "8px",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: emprunt.en_retard ? "#E8F5E9" : "#FFEBEE",
        color: emprunt.en_retard ? "#1B5E20" : "#B71C1C",
      }}> {/*On utilise une fonction pour obtenir le statut de l'emprunt*/}
        {getStatus(emprunt)}
      </span>
    </div>
  );
}

export default EmpruntCard;