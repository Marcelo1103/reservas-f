import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "@/core/http/http";

export default function ReservaMesas() {
  const navigate = useNavigate();

  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("reserva-datos"));

    if (!datos) {
      navigate("/reservar");
      return;
    }

    const load = async () => {
      try {
        const { data } = await http.get("/api/mesas/disponibles", {
          params: {
            inicio: datos.inicio,
            fin: datos.fin,
          },
        });

        setMesas(data);
      } catch {
        setError("No se pudieron cargar las mesas disponibles.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const seleccionarMesa = (mesa) => {
    localStorage.setItem(
      "reserva-seleccion",
      JSON.stringify({
        mesaId: mesa.idMesa,
        mesaNumero: mesa.numeroMesa,
        capacidad: mesa.cantidad,
      })
    );

    navigate("/reservar/confirmar");
  };

  // Loading UI
  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <div className="text-gray-600 text-lg animate-pulse">
          Cargando mesas disponibles...
        </div>
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-300 p-4 rounded-lg text-red-700">
          {error}
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* -------------------- BOTÓN VOLVER -------------------- */}
      <button
        onClick={() => navigate("/reservar")}
        className="mb-6 px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 
                   rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
      >
        ← Volver a modificar fecha u horario
      </button>
      {/* ------------------------------------------------------- */}

      <h2 className="text-3xl font-bold text-gray-900">Mesas disponibles</h2>
      <p className="text-gray-600 mt-1">
        Selecciona una mesa para continuar con la reserva.
      </p>

      {/* No hay mesas */}
      {mesas.length === 0 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-yellow-800">
          No hay mesas disponibles en ese horario.
        </div>
      )}

      {/* Grid de mesas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {mesas.map((mesa) => (
          <div
            key={mesa.idMesa}
            onClick={() => seleccionarMesa(mesa)}
            className="cursor-pointer bg-white border border-gray-200 rounded-xl p-5 shadow-sm 
                      hover:shadow-lg hover:border-blue-500 transition-all"
          >
            {/* Icono de mesa */}
            <div className="w-full flex justify-center mb-4">
              <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-4xl">🪑</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Mesa {mesa.numeroMesa}
            </h3>

            <p className="text-gray-600 mt-2 text-center">
              Capacidad:{" "}
              <span className="font-medium text-gray-900">{mesa.cantidad}</span>
            </p>

            <div className="mt-4 text-center">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                Disponible
              </span>
            </div>

            {/* Flecha de selección */}
            <div className="mt-4 flex justify-center">
              <span className="text-blue-600 text-xl">👉</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
