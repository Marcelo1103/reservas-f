import React from "react";
import "./LoginScreen.css";

export default function LoginScreen() {
  return (
    <div className="login-hero">
      {/* Overlay oscuro */}
      <div className="hero-overlay" />

      {/* Tarjeta */}
      <div className="login-panel">
        <h1 className="login-title">
          <span>Login</span> Reservar Mesa
        </h1>

        <p className="login-subtitle">El Mejor Restaurante</p>
        <div className="title-underline" />

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button  type="submit">Login</button>
        </form>

        <a className="forgot" href="#">Registrarse</a>
      </div>

     
    </div>
  );
}
