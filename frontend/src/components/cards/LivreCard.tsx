// frontend/src/components/LivreCard.tsx
import type { Livre } from "../../types";

interface LivreCardProps {
  // Bonne pratique
  // Les props d'un composant React ne doivent pas être modifiées par le composant qui les reçoit
  readonly livre: Livre;
  readonly onDelete: (id: number) => void; // suppression d'un livre via son id
  readonly onEdit: (livre: Livre) => void; // modification d'un livre via l'objet
}

function LivreCard({ livre, onDelete, onEdit }: LivreCardProps) {
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
      <h3 style={{ marginBottom: "4px" }}>{livre.titre}</h3>
      <p style={{ color: "#555", fontSize: "14px" }}>
        {livre.auteur}
        {livre.annee ? `- ${livre.annee}` : ""}
      </p>
      {/*Rendu conditionnel - Genre peut être optionnel on s'assure donc de son existence avant d'afficher le p*/}
      {livre.genre && (
        <p style={{ fontSize: "13px", color: "#888" }}>{livre.genre}</p>
      )}
      <span
        style={{
          display: "inline-block",
          marginTop: "8px",
          padding: "2px 10px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: "bold",
          backgroundColor: livre.disponible ? "#E8F5E9" : "#FFEBEE",
          color: livre.disponible ? "#1B5E20" : "#B71C1C",
        }}
      >
        {" "}
        {/*Opérateur ternaire : SI disponible est TRUE alors vert SINON rouge*/}
        {livre.disponible ? "Disponible" : "Emprunté"}
      </span>
      <button onClick={() => onEdit(livre)}>Modifier</button>
      {/* Arrow fonction pour empêcher l'exécution directe*/}
      <button onClick={() => onDelete(livre.id)}>Supprimer</button>
    </div>
  );
}

export default LivreCard;
