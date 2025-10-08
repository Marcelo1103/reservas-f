import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardScreen.css";

export default function DashboardScreen() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const nombre = (user?.nombre || "USUARIO").toUpperCase();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dash-root">
      <aside className="dash-side">
        <div className="side-title">MENÚ</div>
        <a className="side-link" href="#home">🏠 Home</a>
        <a className="side-link" href="#reservar">🗓️ Reservar mesa</a>
        <a className="side-link" href="#mis-reservas">📋 Mis reservas</a>
        <a className="side-link" href="#notificaciones">🔔 Notificaciones</a>
        <a className="side-link" href="#perfil">👤 Perfil</a>
        <button className="side-logout" onClick={logout}>⏻ Cerrar sesión</button>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <h1 className="dash-title">BIENVENIDO, {nombre} 👋</h1>
          <div className="dash-user">{user?.nombre || "Usuario"} <span className="dash-avatar">🧑</span></div>
        </header>

        <section className="dash-card">
          <div className="card-icon">📅</div>
          <div>
            <div className="card-title">Reservas Próximas</div>
            <div className="card-sub">MESA 5</div>
            <div className="card-date">20/07/2025, 7:00PM</div>
          </div>
        </section>

        <section className="dash-block">
          <h3 className="block-title">NOTIFICACIONES</h3>
          <div className="notif-item">🔔 <span>Su reserva ha sido confirmada.</span></div>
          <div className="notif-item">🔔 <span>Recuerda tu reserva mañana a las 7:00pm.</span></div>
        </section>

        <section className="dash-cta">
          <button className="cta-btn" onClick={() => alert("Ir a crear reserva")}>
            ➕ Crear Nueva Reserva
          </button>
        </section>
      </main>
    </div>
  );
}
