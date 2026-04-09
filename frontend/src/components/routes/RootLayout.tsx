// src/components/routes/RootLayout.tsx
// Ce composant va fournir un layout avec la NavBar 
// Et Outlet sert d'emplacement aux différents contenus (livres, adhérents, emprunts)
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      {/*// TODO 3 : h1 placeholder, à remplacer par un composant NavBar plus tard*/}
      <h1>Tableau de bord</h1>
      <Outlet />
    </div>
  );
}