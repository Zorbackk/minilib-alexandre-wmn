// frontend/src/App.tsx
import "./index.css"
import LivresPage from "./pages/LivresPage";
// import AdherentsPage from "./pages/AdherentsPage";


function App() {
  return (
    <div>
      <h1>MiniLib</h1>
      <p>Application de gestion de bibliothèque</p>
      <LivresPage />
    </div>
  );
}

export default App;