// src/components/Auth/RegisterScreen.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css"; // mismos estilos que login
import { registerApi, loginApi } from "../../services/authApi";

const MAIN_ROUTE = "/dashboard"; // cámbialo a "/" si esa es tu pantalla principal

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    confirmar: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveSession = (auth) => {
    // auth = AuthResponse { usu_id, usu_nombre, usu_apellido, rol_id, token }
    localStorage.setItem("token", auth.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: auth.usu_id,
        nombre: auth.usu_nombre,
        apellido: auth.usu_apellido,
        rolId: auth.rol_id,
      })
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (form.contrasena !== form.confirmar) {
      setErr("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      // 1) Registrar
      const { data } = await registerApi({
        nombres: form.nombres,
        apellidos: form.apellidos,
        correo: form.correo,
        contrasena: form.contrasena,
      });

      // 2) Si el /register ya devuelve token (tu caso), úsalo y entra
      if (data?.token) {
        saveSession(data);
        navigate(MAIN_ROUTE);
        return;
      }

      // 3) Fallback: si tu /register no diera token, iniciamos sesión con las mismas credenciales
      const { data: loginData } = await loginApi({
        correo: form.correo,
        contrasena: form.contrasena,
      });
      if (!loginData?.token) throw new Error("No se recibió token tras el registro");
      saveSession(loginData);
      navigate(MAIN_ROUTE);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-hero">
      <div className="hero-overlay" />
      <div className="login-panel">
        <h1 className="login-title">
          <span>Registro</span> Reservar Mesas
        </h1>
        <p className="login-subtitle">Crea tu cuenta</p>
        <div className="title-underline" />
        <form className="login-form" onSubmit={onSubmit}>
          <input
            name="nombres"
            type="text"
            placeholder="Nombres"
            value={form.nombres}
            onChange={change}
            required
          />
          <input
            name="apellidos"
            type="text"
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={change}
            required
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={change}
            required
          />
          <input
            name="contrasena"
            type="password"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={change}
            required
          />
          <input
            name="confirmar"
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirmar}
            onChange={change}
            required
          />
          {err && <p className="error" style={{ color: "#ffb4b4" }}>{err}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="forgot">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
