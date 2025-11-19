import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { empleadoApi } from "@features/empleado/services/empleadoApi";

export default function EmpleadoReservaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const { data } = await empleadoApi.getReservaDetalle(id);
      setReserva(data);
    } finally {
      setLoading(false);
    }
  }

  // ==== PETICIONES PARA CONFIRMAR / CANCELAR ====

  async function confirmar() {
    if (!confirm("¿Confirmar esta reserva?")) return;

    setProcesando(true);
    try {
      await empleadoApi.confirmarReserva(id);
      await load();
      alert("Reserva confirmada.");
    } finally {
      setProcesando(false);
    }
  }

  async function cancelar() {
    if (!confirm("¿Cancelar esta reserva?")) return;

    setProcesando(true);
    try {
      await empleadoApi.cancelarReserva(id);
      await load();
      alert("Reserva cancelada.");
    } finally {
      setProcesando(false);
    }
  }

  // ==== CONTROL DE ESTADO PARA MOSTRAR BOTONES ====

  const estado = reserva?.estadoReserva?.idEstadoReserva;

  const puedeConfirmar = estado === 1; // Pendiente
  const puedeCancelar = estado === 1 || estado === 2; // Pendiente o Confirmada

  // ==== ESTILOS DE COLOR ====

  const estadoColors = {
    1: "bg-yellow-100 text-yellow-700",
    2: "bg-blue-100 text-blue-700",
    3: "bg-red-100 text-red-700",
  };

  if (loading)
    return <p className="p-6 text-gray-500">Cargando reserva...</p>;

  if (!reserva)
    return <p className="p-6 text-red-500">No se encontró la reserva.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">

      {/* Volver */}
      <button
        onClick={() => navigate("/empleado/dashboard")}
        className="
          inline-flex items-center gap-2 px-4 py-2
          bg-white hover:bg-gray-100
          text-gray-700 text-sm font-medium
          border border-gray-300 rounded-lg 
          shadow-sm hover:shadow transition
        "
      >
        ← Volver
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Detalle de la Reserva
        </h1>
        <p className="text-gray-500 mt-1">Reserva #{reserva.idReserva}</p>
      </div>

      {/* Estado */}
      <div
        className={`
          inline-flex items-center gap-3 px-4 py-2 rounded-full
          ${estadoColors[estado]}
        `}
      >
        <span className="font-semibold">
          {reserva.estadoReserva.nombre}
        </span>
      </div>

      {/* Información */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">

        <div>
          <p className="text-sm text-gray-500">Cliente</p>
          <p className="text-lg font-semibold text-gray-900">
            {reserva.usuario.nombre}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Mesa</p>
          <p className="text-lg font-semibold text-gray-900">
            Mesa {reserva.mesa.numeroMesa}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Fecha</p>
          <p className="text-gray-800 font-medium">
            {new Date(reserva.fechaHora).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Horario</p>
          <p className="text-gray-800 font-medium">
            {new Date(reserva.fechaHora).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" — "}
            {new Date(reserva.fechaHoraCierre).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Personas</p>
          <p className="text-lg font-semibold text-gray-900">
            {reserva.cantidadPersonas}
          </p>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">

        <h3 className="text-lg font-semibold text-gray-800">Acciones</h3>

        {puedeConfirmar && (
          <button
            disabled={procesando}
            onClick={confirmar}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Confirmar reserva
          </button>
        )}

        {puedeCancelar && (
          <button
            disabled={procesando}
            onClick={cancelar}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Cancelar reserva
          </button>
        )}

        {estado === 3 && (
          <p className="text-gray-500 text-sm">
            Esta reserva ya está cancelada.
          </p>
        )}

      </div>

    </div>
  );
}
