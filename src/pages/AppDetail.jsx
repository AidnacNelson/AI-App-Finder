// AppDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useAppData from "../hooks/useAppData"; // your Airtable hook

export default function AppDetail() {
  const { appId } = useParams();
  const apps = useAppData();
  const app  = apps.find(a => a.id === appId);

  if (!app) return <p>Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{app.name}</h1>
      <p>{app.description}</p>
      {/* add more fields as you like */}
    </div>
  );
}
