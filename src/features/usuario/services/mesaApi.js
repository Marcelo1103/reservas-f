// src/features/usuario/api/mesasApi.js
import http from "@/core/http/http";

export const getMesasDisponibles = async (inicio, fin) => {
  try {
    const { data } = await http.get("/api/mesas/disponibles", {
      params: { inicio, fin },
    });
    return data; // devuelve solo lo necesario
  } catch {
    throw new Error("No se pudieron cargar las mesas disponibles");
  }
};
