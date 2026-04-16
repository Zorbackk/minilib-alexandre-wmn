import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from './components/routes/RootLayout';
import LivresPage from './pages/LivresPage';
import AdherentsPage from './pages/AdherentsPage';
import EmpruntsPage from './pages/EmpruntsPage';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {index: true, Component: LivresPage},
      {path: "adherents", Component: AdherentsPage},
      {path: "emprunts", Component: EmpruntsPage},
    ],
  },
]);

const root = document.getElementById("root");

// En TypeScript mettre ! est l'assertion non-null - On garantit la non nullité à TS
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
