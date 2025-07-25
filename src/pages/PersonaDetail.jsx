// PersonaDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function PersonaDetail() {
  const { personaId } = useParams();
  // pull from your personas list or hook…
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{personaId}</h1>
      <p>Details about {personaId} go here.</p>
    </div>
  );
}
