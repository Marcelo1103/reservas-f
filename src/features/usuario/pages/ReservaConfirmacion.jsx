import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "@/core/http/http";

export default function ReservaConfirmacion() {
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);
  const [personas, setPersonas] = useState(1);

  const datos = JSON.parse(localStorage.getItem("reserva-datos") || "null");
  const mesa = JSON.parse(localStorage.getItem("reserva-seleccion") || "null");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!datos || !mesa || !user) {
      navigate("/reservar");
    } else {
      setPersonas(mesa.capacidad || 1);
    }
  }, [datos, mesa, user, navigate]);


  const confirmar = async () => {
    if (personas < 1 || personas > mesa.capacidad) {
      alert("La cantidad de personas debe estar entre 1 y " + mesa.capacidad);
      return;
    }

    setProcesando(true);
    try {
      await http.post("/api/reservas", {
        idUsuario: user.id,
        idMesa: mesa.mesaId,
        fechaHora: datos.inicio,
        fechaHoraCierre: datos.fin,
        personas: Number(personas),
      });

      localStorage.removeItem("reserva-datos");
      localStorage.removeItem("reserva-seleccion");

      alert("✅ Reserva creada correctamente");
      navigate("/mis-reservas");
    } catch (err) {
      console.error("Error al crear reserva:", err);
      alert("❌ Error al crear la reserva. Intenta nuevamente.");
      setProcesando(false);
    }
  };


  const calcularDuracion = () => {
    const inicio = new Date(datos.inicio);
    const fin = new Date(datos.fin);
    const diffMs = fin - inicio;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMins > 0 ? diffMins + "m" : ""}`;
  };


  if (!datos || !mesa || !user) return null;



  return (
    <div className="p-6 max-w-3xl mx-auto">
{/* Botón volver */}
      <button
        onClick={() => navigate("/reservar/mesas")}
        className="    inline-flex items-center gap-2 mb-6 px-4 py-2
    bg-gray-100 text-gray-700 border border-gray-300
    rounded-lg shadow-sm
    hover:bg-gray-200 hover:text-gray-900 hover:border-gray-400
    transition-all duration-200"
      >
        <span className="text-lg">←</span>
        <span className="text-sm">Cambiar mesa</span>
      </button>
      {/* Título */}
      <h2 className="text-3xl font-bold text-gray-900 mb-1">Confirmar Reserva</h2>
      <p className="text-gray-600 mb-6">
        Revisa los detalles antes de confirmar tu reserva.
      </p>

      {/* Tarjeta principal */}
      <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden mb-6">

        {/* Encabezado mesa */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">
              🪑
            </div>

            <div>
              <p className="text-lg text-blue-100">Mesa seleccionada</p>
              <h3 className="text-2xl font-bold">Mesa #{mesa.mesaNumero}</h3>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">

          {/* Fecha & duración */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* Fecha */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📅</span>
                <span className="text-sm text-gray-500">Fecha</span>
              </div>

              <p className="text-gray-900 font-medium">
                {new Date(datos.inicio).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Duración */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⏰</span>
                <span className="text-sm text-gray-500">Duración</span>
              </div>
              <p className="text-gray-900 font-medium">{calcularDuracion()}</p>
            </div>
          </div>


          {/* Horario */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Hora de inicio</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(datos.inicio).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="text-gray-400 text-2xl">→</div>

              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Hora de fin</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(datos.fin).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>


          {/* Cantidad de personas */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <label className="block mb-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👥</span>
                <span className="text-sm font-medium text-gray-900">
                  Cantidad de personas
                </span>
              </div>
              <input
                type="number"
                min="1"
                max={mesa.capacidad}
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                  text-gray-900 text-lg font-medium focus:outline-none focus:ring-2 
                  focus:ring-blue-500"
              />
            </label>

            <p className="text-xs text-gray-500">
              La mesa acepta hasta {mesa.capacidad} personas.
            </p>
          </div>
        </div>
      </div>


      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-">
          <span>ℹ️</span>
          <span>Información importante</span>
        </h4>
        <ul className="text-sm text-blue-900 space-y-1">
          <li>• La reserva quedará en estado <strong>Pendiente</strong>.</li>
          <li>• Recibirás una notificación cuando se confirme.</li>
          <li>• Puedes cancelar hasta 24 horas antes sin costo.</li>
        </ul>
      </div>


      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Volver */}
        <button
          onClick={() => navigate("/reservar/mesas")}
          disabled={procesando}
          className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200
          text-gray-900 font-semibold rounded-lg transition flex items-center justify-center gap-2"
        >
          ← Volver
        </button>

        {/* Confirmar */}
        <button
          onClick={confirmar}
          disabled={procesando || personas < 1 || personas > mesa.capacidad}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 
          disabled:bg-blue-300 text-white font-semibold rounded-lg transition
          flex items-center justify-center gap-2 shadow-md"
        >
          {procesando ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Procesando...
            </>
          ) : (
            <>
              <span>✓</span> Confirmar reserva
            </>
          )}
        </button>
      </div>


      <p className="text-center text-xs text-gray-500 mt-6">
        Al confirmar aceptas nuestras políticas de reserva.
      </p>
    </div>
  );
}
