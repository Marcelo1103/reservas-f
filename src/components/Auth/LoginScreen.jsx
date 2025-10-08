import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import { loginApi } from "../../services/authApi";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await loginApi({ correo, contrasena });
      if (!data?.token) throw new Error("No se recibió token");

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.usu_id,
          nombre: data.usu_nombre,
          apellido: data.usu_apellido,
        })
      );

      navigate("/dashboard", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-hero">
      <div className="hero-overlay" />
      <div className="login-panel">
        <h1 className="login-title"><span>Login</span> Reservar Mesas</h1>
        <p className="login-subtitle">El Mejor Restaurante</p>
        <div className="title-underline" />
        <form className="login-form" onSubmit={onSubmit}>
          <input type="email" placeholder="Correo" value={correo}
                 onChange={(e) => setCorreo(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={contrasena}
                 onChange={(e) => setContrasena(e.target.value)} required />
          {err && <p className="error">{err}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Login"}
          </button>
        </form>
        <Link className="forgot" to="/registro">Registrarse</Link>
      </div>
    </div>
  );
}
