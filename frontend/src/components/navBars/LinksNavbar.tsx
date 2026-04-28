// frontend/src/components/navBars/LinksNavbar
// Composant permettant de naviguer entre les différentes sections
// de l'application
import { BookMarked, BookOpen, Users } from "lucide-react";
import { NavLink } from "react-router";

const links = [
  {to: "/", end: true, icon:BookOpen, label: "Livres"},
  {to: "/adherents", icon: Users, label: "Adhérents"},
  {to: "/emprunts", icon: BookMarked, label: "Emprunts"}
];

export function LinksNavBar() {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {links.map(({ to, end, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
