import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css"; // compartimos estilos con Login
import { registerApi, loginApi } from "../../services/authApi";

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
    localStorage.setItem("token", auth.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: auth.usu_id,
        nombre: auth.usu_nombre,
        apellido: auth.usu_apellido,
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

      // 2) Si el registro ya devuelve token, entrar directo
      if (data?.token) {
        saveSession(data);
        navigate("/dashboard", { replace: true });
        return;
      }

      // 3) Si no, login automático con las mismas credenciales
      const { data: loginData } = await loginApi({
        correo: form.correo,
        contrasena: form.contrasena,
      });
      if (!loginData?.token) throw new Error("No se recibió token tras el registro");
      saveSession(loginData);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-hero">
      <div className="hero-overlay" />
      <div className="login-panel glass">
        <h1 className="login-title">
          <span className="title-accent">Registro</span> Reservar Mesas
        </h1>
        <p className="login-subtitle">Crea tu cuenta</p>
        <div className="title-underline" />

        <form className="login-form" onSubmit={onSubmit}>
        
          
            <input
              className="field"
              name="nombres"
              type="text"
              placeholder="Nombres"
              value={form.nombres}
              onChange={change}
              required
            />

            <input
              className="field"
              name="apellidos"
              type="text"
              placeholder="Apellidos"
              value={form.apellidos}
              onChange={change}
              required
            />
          

          <input
            className="field"
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={change}
            required
          />

          <input
            className="field"
            name="contrasena"
            type="password"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={change}
            required
          />

          <input
            className="field"
            name="confirmar"
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirmar}
            onChange={change}
            required
          />

          {err && <p className="error">{err}</p>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "REGISTRARME"}
          </button>
        </form>

        <p className="alt-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
