import React from "react";

export default function DashboardScreen() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ color: "#fff", padding: 32 }}>
      <h1>Bienvenido {user.nombre || "Usuario"}</h1>
      <p>Rol ID: {user.rolId ?? "—"}</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
