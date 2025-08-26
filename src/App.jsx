import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/dashboard";

export default function App() {
  const [mode, setMode] = useState("landing");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {mode === "landing" ? (
        <LandingPage onStart={() => setMode("dashboard")} />
      ) : (
        <Dashboard onBack={() => setMode("landing")} />
      )}
    </div>
  );
}
