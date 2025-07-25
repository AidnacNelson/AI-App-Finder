// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

// Your “main” UI:
import SunflowerStack from "./components/SunflowerStack";

// Detail pages you created:
import AppDetail      from "./pages/AppDetail";
import PersonaDetail  from "./pages/PersonaDetail";

export default function App() {
  return (
    <Routes>
      {/* “/” now loads your SunflowerStack */}
      <Route path="/" element={<SunflowerStack />} />

      {/* Detail views */}
      <Route path="/app/:appId"       element={<AppDetail />} />
      <Route path="/persona/:personaId" element={<PersonaDetail />} />
    </Routes>
  );
}
