import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "@/core/http/http";
import DatePicker from "react-datepicker";

export default function ReservaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Campos editables
  // Campos editables
  const [fecha, setFecha] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [personas, setPersonas] = useState(1);

  // Estados para acciones
  const [procesando, setProcesando] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // === Helper seguro sin "Z" ===
  const toLocalISOString = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":00"
    );
  };


  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await http.get(`/api/reservas/${id}`);
        setReserva(data);
        const fh = new Date(data.fechaHora);
        const fhc = new Date(data.fechaHoraCierre);

        // Fecha (solo día)
        setFecha(new Date(fh.getFullYear(), fh.getMonth(), fh.getDate()));

        // Inicio (solo hora)
        setInicio(new Date(0, 0, 0, fh.getHours(), fh.getMinutes()));

        // Fin (solo hora)
        setFin(new Date(0, 0, 0, fhc.getHours(), fhc.getMinutes()));

        setPersonas(data.cantidadPersonas);

      } catch (err) {
        console.error("Error al cargar reserva:", err);
        setError("No se encontró la reserva.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // ======= ACCIONES =======

  const cancelar = async () => {
    if (!confirm("¿Seguro que deseas cancelar esta reserva?")) return;

    setProcesando(true);
    try {
      await http.patch(`/api/reservas/${id}/cancelar`);
      alert("✅ Reserva cancelada correctamente.");
      navigate("/mis-reservas");
    } catch (err) {
      console.error("Error al cancelar:", err);
      alert("❌ No se pudo cancelar la reserva.");
    } finally {
      setProcesando(false);
    }
  };

  const confirmar = async () => {
    setProcesando(true);
    try {
      await http.patch(`/api/reservas/${id}/confirmar`);
      alert("✅ Reserva confirmada correctamente.");
      navigate("/mis-reservas");
    } catch (err) {
      console.error("Error al confirmar:", err);
      alert("❌ No se pudo confirmar la reserva.");
    } finally {
      setProcesando(false);
    }
  };

  const actualizar = async () => {
    if (!fecha || !inicio || !fin) {
      alert("Completa todos los campos.");
      return;
    }

    // Validar duración mínima
    const totalMin = (fin - inicio) / 1000 / 60;
    if (totalMin < 60) {
      alert("La reserva debe durar al menos 1 hora.");
      return;
    }

    // Validar fin > inicio
    if (fin <= inicio) {
      alert("La hora de fin debe ser posterior a la de inicio.");
      return;
    }

    // Validar horario permitido 06–21
    const minH = 6;
    const maxH = 21;
    if (
      inicio.getHours() < minH ||
      inicio.getHours() > maxH ||
      fin.getHours() < minH ||
      fin.getHours() > maxH
    ) {
      alert("Las reservas deben ser entre 06:00 y 21:00.");
      return;
    }

    // Construcción correcta de fechas
    const inicioReal = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      inicio.getHours(),
      inicio.getMinutes()
    );

    const finReal = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      fin.getHours(),
      fin.getMinutes()
    );

    const inicioISO = toLocalISOString(inicioReal);
    const finISO = toLocalISOString(finReal);

    setProcesando(true);
    try {
      await http.put(`/api/reservas/${id}`, {
        fechaHora: inicioISO,
        fechaHoraCierre: finISO,
        personas: Number(personas),
      });

      alert("Reserva actualizada correctamente.");
      navigate("/mis-reservas");

    } catch {
      alert("No se pudo actualizar.");
    } finally {
      setProcesando(false);
    }
  };

  // ======= UTILIDADES =======

  const estadoInfo = (idEstado) => {
    switch (idEstado) {
      case 1:
        return { color: "text-yellow-400", bg: "bg-yellow-900/20", border: "border-yellow-500/30", label: "Pendiente", icon: "⏳" };
      case 2:
        return { color: "text-blue-400", bg: "bg-blue-900/20", border: "border-blue-500/30", label: "Confirmada", icon: "✅" };
      case 3:
        return { color: "text-green-400", bg: "bg-green-900/20", border: "border-green-500/30", label: "Finalizada", icon: "🎉" };
      case 4:
        return { color: "text-red-400", bg: "bg-red-900/20", border: "border-red-500/30", label: "Cancelada", icon: "❌" };
      default:
        return { color: "text-gray-400", bg: "bg-gray-900/20", border: "border-gray-500/30", label: "Desconocido", icon: "❓" };
    }
  };

  const puedeEditar = () => {
    return reserva && (reserva.estadoReserva.idEstadoReserva === 1 || reserva.estadoReserva.idEstadoReserva === 2);
  };


  const sumar30Min = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + 30);
    return d;
  };



  // ======= RENDERS =======

  if (loading) {
    return (
      <div className="p-6 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-zinc-400">Cargando reserva...</p>
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
                onClick={() => navigate("/mis-reservas")}
                className="
                inline-flex items-center gap-2 px-4 py-2 mb-4
                bg-zinc-700 hover:bg-zinc-600
                text-white text-sm font-medium
                border border-zinc-600 rounded-lg 
                shadow-sm hover:shadow-md 
                transition-all
              "
              >
                <span className="text-lg">←</span>
                <span>Volver a mis reservas</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reserva) return null;

  const estado = estadoInfo(reserva.estadoReserva.idEstadoReserva);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Volver */}
      <button
        onClick={() => navigate("/mis-reservas")}
        className="
        inline-flex items-center gap-2 px-4 py-2
        bg-white hover:bg-gray-100
        text-gray-700 text-sm font-medium
        border border-gray-300 rounded-lg 
        shadow-sm hover:shadow 
        transition-all
      "
      >
        <span className="text-lg">←</span>
        <span>Volver a mis reservas</span>
      </button>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Detalle de Reserva</h2>
        <p className="text-gray-500 mt-1">
          Mesa #{reserva.mesa.numeroMesa}
        </p>
      </div>

      {/* Estado */}
      <div
        className={`
        inline-flex items-center gap-3 px-4 py-2 rounded-lg
        ${estado.bg} ${estado.border}
      `}
      >
        <span className="text-2xl">{estado.icon}</span>
        <span className={`font-semibold ${estado.color}`}>
          {reserva.estadoReserva.nombre}
        </span>
      </div>

      {/* Info principal */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Información de la reserva
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500 mb-1">Fecha y hora</p>
            <p className="text-gray-800 font-semibold">
              {new Date(reserva.fechaHora).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Cantidad de personas</p>
            <p className="text-gray-800 font-semibold">{reserva.cantidadPersonas} personas</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Mesa asignada</p>
            <p className="text-gray-800 font-semibold">Mesa #{reserva.mesa.numeroMesa}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Capacidad de la mesa</p>
            <p className="text-gray-800 font-semibold">{reserva.mesa.capacidad} personas</p>
          </div>

        </div>
      </div>

      {/* Edición */}
      {puedeEditar() && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Editar reserva</h3>

            <button
              onClick={() => setModoEdicion(!modoEdicion)}
              className="
              text-blue-600 hover:text-blue-700 text-sm font-semibold
              transition
            "
            >
              {modoEdicion ? "Cancelar edición" : "✏️ Editar"}
            </button>
          </div>

          {modoEdicion && (
            <div className="space-y-5">

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <DatePicker
                  selected={fecha}
                  onChange={setFecha}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  className="
                  w-full px-4 py-3 
                  bg-gray-50 border border-gray-300
                  rounded-lg shadow-sm focus:ring-2
                  focus:ring-blue-500 focus:border-blue-500
                "
                />
              </div>

              {/* Inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de inicio
                </label>
                <DatePicker
                  selected={inicio}
                  onChange={(d) => {
                    setInicio(d);
                    setError("");
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  minTime={new Date(0, 0, 0, 6, 0)}
                  maxTime={new Date(0, 0, 0, 21, 0)}
                  timeIntervals={30}
                  scrollDefaultTime={new Date(0, 0, 0, 6, 0)}
                  timeCaption="Inicio"
                  dateFormat="HH:mm"
                  className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de fin
                </label>
                <DatePicker
                  selected={fin}
                  onChange={(d) => {
                    setFin(d);
                    setError("");
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  minTime={
                    inicio
                      ? sumar30Min(new Date(0, 0, 0, inicio.getHours(), inicio.getMinutes()))
                      : new Date(0, 0, 0, 6, 30)
                  }
                  maxTime={new Date(0, 0, 0, 21, 0)}
                  scrollDefaultTime={new Date(0, 0, 0, 7, 0)}
                  timeCaption="Fin"
                  dateFormat="HH:mm"
                  className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Personas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de personas
                </label>
                <input
                  type="number"
                  value={personas}
                  min={1}
                  max={reserva.mesa.capacidad}
                  onChange={(e) => setPersonas(e.target.value)}
                  className="
                  w-full px-4 py-3 
                  bg-gray-50 border border-gray-300
                  rounded-lg shadow-sm focus:ring-2
                  focus:ring-blue-500 focus:border-blue-500
                "
                />
              </div>

              <button
                onClick={actualizar}
                disabled={procesando}
                className="
                w-full px-6 py-3 
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold rounded-lg 
                shadow-md transition
              "
              >
                {procesando ? "Guardando..." : "💾 Guardar cambios"}
              </button>

            </div>
          )}
        </div>
      )}

      {/* Acciones */}
      {puedeEditar() && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">

          <h3 className="text-xl font-bold text-gray-900 mb-2">Acciones</h3>

          <div className="flex flex-col sm:flex-row gap-3">

            {reserva.estadoReserva.idEstadoReserva === 1 && (
              <button
                onClick={confirmar}
                disabled={procesando}
                className="
                flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 
                text-white rounded-lg shadow
                transition font-semibold
              "
              >
                {procesando ? "Procesando..." : "Confirmar reserva"}
              </button>
            )}

            <button
              onClick={cancelar}
              disabled={procesando}
              className="
              flex-1 px-6 py-3 bg-red-600 hover:bg-red-700
              text-white rounded-lg shadow
              transition font-semibold
            "
            >
              {procesando ? "Procesando..." : "Cancelar reserva"}
            </button>

          </div>

          <p className="text- text-gray-500">
            Las cancelaciones deben realizarse con 24 horas de anticipación.
          </p>
        </div>
      )}

      {!puedeEditar() && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-sm">
          <p className="text-gray-500">
            Esta reserva no puede ser modificada debido a su estado actual.
          </p>
        </div>
      )}

    </div>
  );

}