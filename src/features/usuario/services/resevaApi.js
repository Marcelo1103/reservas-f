// src/features/usuario/api/reservasApi.js
import http from "@/core/http/http";

export const crearReserva = async (payload) => {
  try {
    const { data } = await http.post("/api/reservas", payload);
    return data;
  } catch {
    throw new Error("No se pudo crear la reserva");
  }
};

export const getMisReservas = async (idUsuario) => {
  try {
    const { data } = await http.get(`/api/reservas/mias/${idUsuario}`);
    return data;
  } catch {
    throw new Error("No se pudieron cargar tus reservas");
  }
};

export const getReservaById = async (id) => {
  try {
    const { data } = await http.get(`/api/reservas/${id}`);
    return data;
  } catch {
    throw new Error("No se encontró la reserva solicitada");
  }
};

export const actualizarReserva = async (id, payload) => {
  try {
    const { data } = await http.put(`/api/reservas/${id}`, {
      fechaHora: payload.fechaHora,
      fechaHoraCierre: payload.fechaHoraCierre,
      personas: payload.personas
    });
    return data;
  } catch {
    throw new Error("No se pudo actualizar la reserva");
  }
};

export const cancelarReserva = async (id) => {
  try {
    const { data } = await http.patch(`/api/reservas/${id}/cancelar`);
    return data;
  } catch {
    throw new Error("No se pudo cancelar la reserva");
  }
};

export const confirmarReserva = async (id) => {
  try {
    const { data } = await http.patch(`/api/reservas/${id}/confirmar`);
    return data;
  } catch {
    throw new Error("No se pudo confirmar la reserva");
  }
};
