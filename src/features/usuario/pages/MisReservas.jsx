import React, { useEffect, useState } from "react";
import http from "@/core/http/http";
import { useNavigate } from "react-router-dom";

export default function MisReservas() {
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        const { data } = await http.get(`/api/reservas/mias/${user.id}`);
        const ordenadas = data.sort(
          (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)
        );
        setReservas(ordenadas);
      } catch (err) {
        console.error("Error al cargar reservas:", err);
        setError("No se pudieron cargar tus reservas. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);



  if (loading) {
    return (
      <div className="p-6 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-zinc-400">Cargando reservas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-red-400 font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

return (
  <div className="p-6 max-w-4xl mx-auto">

    {/* Título */}
    <h2 className="text-3xl font-bold text-gray-900">Mis Reservas</h2>
    <p className="text-gray-600">Revisa el estado actual de tus reservas.</p>

    {/* No hay reservas */}
    {reservas.length === 0 && (
      <div className="mt-10 text-center py-14 bg-white border border-gray-200 rounded-xl shadow-sm">
        <span className="text-6xl block mb-4">📋</span>
        <p className="text-gray-600 text-lg">No tienes reservas registradas.</p>

        <button
          onClick={() => navigate("/reservar")}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg shadow-sm transition"
        >
          Hacer una reserva
        </button>
      </div>
    )}

    {/* Lista */}
    <div className="mt-8 space-y-4">
      {reservas.map((reserva) => (
        <div
        key={reserva.idReserva}
        onClick={() => navigate(`/mis-reservas/${reserva.idReserva}`)}
        className="
          bg-white border border-gray-200 rounded-xl p-6 cursor-pointer 
          shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/mis-reservas/${reserva.idReserva}`);
          }
        }}
      >

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Mesa {reserva.mesa.numeroMesa}
          </h3>

          <span
            className={`
              text-sm font-semibold px-3 py-1 rounded-full
              ${
                reserva.estadoReserva.idEstadoReserva === 1
                  ? "bg-yellow-100 text-yellow-700"
                  : reserva.estadoReserva.idEstadoReserva === 2
                  ? "bg-blue-100 text-blue-700"
                  : reserva.estadoReserva.idEstadoReserva === 3
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {reserva.estadoReserva.nombre}
          </span>
        </div>

        {/* Fecha */}
        <div className="mt-4 flex items-center gap-3 text-gray-700">
          <span className="text-xl">📅</span>
          <p className="text-sm">
            {new Date(reserva.fechaHora).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Horario */}
        <div className="mt-2 flex items-center gap-3 text-gray-700">
          <span className="text-xl">⏰</span>
          <p className="text-sm">
            {new Date(reserva.fechaHora).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}

            {" → "}

            {new Date(reserva.fechaHoraCierre).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Personas */}
        <div className="mt-2 flex items-center gap-3 text-gray-600">
          <span className="text-xl">👥</span>
          <p className="text-sm">
            Personas:{" "}
            <span className="font-medium text-gray-900">
              {reserva.cantidadPersonas}
            </span>
          </p>
        </div>

      </div>

      ))}
    </div>
  </div>
);
}