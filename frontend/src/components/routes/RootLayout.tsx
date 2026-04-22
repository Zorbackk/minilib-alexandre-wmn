// src/components/routes/RootLayout.tsx
// Ce composant va fournir un layout avec la NavBar
// Et Outlet sert d'emplacement aux différents contenus (livres, adhérents, emprunts)
import { Outlet } from "react-router";
import { LinksNavBar } from "../navBars/LinksNavbar";

export default function RootLayout() {
  return (
    <div className="flex h-full bg-background">
      <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <p className="text-lg font-semibold text-foreground">MiniLib</p>
          <p className="text-xs text-muted-foreground">
            Gestion de bibliothèque
          </p>
        </div>
        <LinksNavBar />
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
