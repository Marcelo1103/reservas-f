import React, { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservaForm() {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("reserva-form"));

  if (saved) {
    if (saved.fecha) setFecha(new Date(saved.fecha));
    if (saved.inicio) setInicio(new Date(saved.inicio));
    if (saved.fin) setFin(new Date(saved.fin));
  }
  }, []);


  useEffect(() => {
  localStorage.setItem(
    "reserva-form",
    JSON.stringify({
      fecha,
      inicio,
      fin
    })
  );
  }, [fecha, inicio, fin]);


  const calcularDuracion = () => {
    const total = (fin - inicio) / 1000 / 60;
    const horas = Math.floor(total / 60);
    const minutos = Math.round(total % 60);
    return { horas, minutos };
  };

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

  const continuar = () => {
    setError("");

    if (!fecha || !inicio || !fin) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const fechaSolo = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    );

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSolo < hoy) {
      setError("No puedes seleccionar una fecha pasada.");
      return;
    }

    if (fin <= inicio) {
      setError("La hora de fin debe ser posterior a la hora de inicio.");
      return;
    }

    const duracion = calcularDuracion();
    if (duracion.horas < 1 && duracion.minutos > 0) {
      setError("La reserva debe ser de al menos 1 hora.");
      return;
    }

    const inicioISO = toLocalISOString(
      new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        inicio.getHours(),
        inicio.getMinutes()
      )
    );

    const finISO = toLocalISOString(
      new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        fin.getHours(),
        fin.getMinutes()
      )
    );

    localStorage.setItem(
      "reserva-datos",
      JSON.stringify({ fecha, inicio: inicioISO, fin: finISO })
    );

    navigate("/reservar/mesas");
  };

  const sumar30Min = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + 30);
    return d;
  };

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Realizar Reserva</h2>
      <p className="text-gray-600 mb-6">Selecciona la fecha y horario para tu reserva.</p>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-700">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 border border-gray-200">

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de la reserva</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📅</span>
            <DatePicker
              selected={fecha}
              onChange={(d) => {
                setFecha(d);
                setError("");
              }}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Hora inicio + Hora fin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de inicio</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">⏰</span>
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
          </div>

          {/* Fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora de fin</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">⌛</span>
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
          </div>

        </div>

        {/* Duración */}
        {inicio && fin && fin > inicio && (
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
            <span>⏱️</span>
            <span>
              Duración: {calcularDuracion().horas}h{" "}
              {calcularDuracion().minutos ? `${calcularDuracion().minutos}m` : ""}
            </span>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={continuar}
          disabled={!fecha || !inicio || !fin}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 
          disabled:bg-gray-300 disabled:text-gray-500 
          rounded-xl text-white font-semibold text-lg shadow-sm hover:shadow-md transition-all"
        >
          {!fecha || !inicio || !fin
            ? "Completa todos los campos"
            : "Buscar mesas disponibles 🔍"}
        </button>
      </div>
    </div>
  );
}
