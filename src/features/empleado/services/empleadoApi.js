import api from "@/core/http/http";

export const empleadoApi = {
  getReservasByFecha: (fecha) =>
    api.get("/api/admin/reservas", { params: { fecha } }),

   getReservaDetalle: (id) =>
    api.get(`/api/reservas/${id}`),   // <-- ESTE ES EL CORRECTO

   confirmarReserva: (id) =>
  api.patch(`/api/reservas/${id}/confirmar`),

cancelarReserva: (id) =>
  api.patch(`/api/reservas/${id}/cancelar`),


};
