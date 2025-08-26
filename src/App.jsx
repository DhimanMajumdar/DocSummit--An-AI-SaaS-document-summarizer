import { useState } from "react";
import LandingPage from "./pages/LandingPage";

import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard";

export default function App() {
  const [mode, setMode] = useState("landing");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1">
        {mode === "landing" ? (
          <LandingPage onStart={() => setMode("dashboard")} />
        ) : (
          <Dashboard onBack={() => setMode("landing")} />
        )}
      </div>
      <Footer /> {/* Footer sab pages ke neeche ayega */}
    </div>
  );
}
