// frontend/src/components/navBars/LinksNavbar
// Composant permettant de naviguer entre les différentes sections 
// de l'application
import { NavLink } from "react-router";

export function LinksNavBar() {
  return (
    <nav>
      <NavLink to="/">Livres</NavLink>
      <NavLink to="/adherents">Adhérents</NavLink>
      <NavLink to="/emprunts">Emprunts</NavLink>
    </nav>
  );
}
