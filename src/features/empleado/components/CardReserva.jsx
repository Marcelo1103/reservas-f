import { useNavigate } from "react-router-dom";

export default function CardReserva({ reserva }) {
  const navigate = useNavigate();

  const estadoStyles = {
    1: "bg-yellow-100 text-yellow-700",    // Pendiente
    2: "bg-blue-100 text-blue-700",        // Confirmada
    3: "bg-green-100 text-green-700",      // Finalizada
    4: "bg-red-100 text-red-700",          // Cancelada
  };

  return (
    <div
      onClick={() => navigate(`/empleado/reservas/${reserva.idReserva}`)}
      className="
        bg-white border border-gray-200 rounded-xl p-6 cursor-pointer 
        shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/empleado/reservas/${reserva.idReserva}`);
        }
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Mesa {reserva.mesa.numeroMesa}
        </h3>

        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            estadoStyles[reserva.estadoReserva.idEstadoReserva]
          }`}
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

      {/* Rango horario */}
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
  );
}
