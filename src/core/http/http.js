import axios from "axios";

const http = axios.create({
  headers: { "Content-Type": "application/json" },
});

// Interceptor corregido
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // NO enviar token en login ni en register
  const isAuthRoute =
    config.url.includes("/api/auth/login") ||
    config.url.includes("/api/auth/register");


    
  if (!isAuthRoute && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default http;
