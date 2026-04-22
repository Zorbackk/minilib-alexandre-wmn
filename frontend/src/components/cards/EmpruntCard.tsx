// frontend/src/components/EmpruntCard.tsx
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
function getStatus(EmpruntAvecDetails: EmpruntAvecDetails) {
  if (EmpruntAvecDetails.date_retour_effective !== null) {
    return { label: "Rendu", backgroundColor: "#89C99F", color: "#466651" };
  }
  if (EmpruntAvecDetails.en_retard) {
    return { label: "En retard", backgroundColor: "#FFEBEE", color: "#B71C1C" };
  }
  return { label: "À rendre", backgroundColor: "#F4CA75", color: "#7B663C" };
}

function EmpruntCard({ emprunt, onDelete }: EmpruntCardProps) {
  const statut = getStatus(emprunt);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "16px",
        backgroundColor: "#fff",
        marginBottom: "12px",
      }}
    >
      <h3 style={{ marginBottom: "4px" }}>
        {/* Utilitaire de conversion de la date formatDate()*/}
        Emprunt réalisé le {formatDate(emprunt.date_emprunt)}
      </h3>
      <p style={{ color: "#555", fontSize: "14px" }}>
        {emprunt.titre_livre} par {emprunt.nom_adherent}
      </p>
      <p style={{ fontSize: "13px", color: "#888" }}>
        Retour prévue le {formatDate(emprunt.date_retour_prevue)}
      </p>
      {emprunt.date_retour_effective !== null && (
        <p style={{ fontSize: "13px", color: "#888" }}>
          Retour effectué le {formatDate(emprunt.date_retour_effective)}
        </p>
      )}
      <span
        style={{
          display: "inline-block",
          marginTop: "8px",
          padding: "2px 10px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: "bold",
          backgroundColor: statut.backgroundColor,
          color: statut.color,
        }}
      >
        {" "}
        {/*La fonction est mise en constant pour appeler ses paramètres là où en as besoin*/}
        {statut.label}
      </span>
      {/* Arrow fonction pour empêcher l'exécution directe*/}
      <button onClick={() => onDelete(emprunt.id)}>Effectuer un retour</button>
    </div>
  );
}

export default EmpruntCard;
