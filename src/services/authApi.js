import http from "./http";

// rutas relativas: el proxy las redirige automáticamente a http://localhost:8080
export const loginApi = ({ correo, contrasena }) =>
  http.post("/api/auth/login", { correo, contrasena });

export const registerApi = ({ nombres, apellidos, correo, contrasena }) =>
  http.post("/api/auth/register", { nombres, apellidos, correo, contrasena });
