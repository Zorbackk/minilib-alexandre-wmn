// src/components/routes/RootLayout.tsx
// Ce composant va fournir un layout avec la NavBar
// Et Outlet sert d'emplacement aux différents contenus (livres, adhérents, emprunts)
import { Outlet } from "react-router";
import { LinksNavBar } from "../navBars/LinksNavbar";

export default function RootLayout() {
  return (
    <div>
      {/*// TODO 03 : h1 placeholder, à remplacer par un composant NavBar plus tard*/}
      <h1>Tableau de bord</h1>
      <LinksNavBar />
      <Outlet />
    </div>
  );
}
