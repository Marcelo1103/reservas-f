import { useEffect, useState } from "react";
import { empleadoApi } from "@features/empleado/services/empleadoApi";
import FechaSelector from "@features/empleado/components/FechaSelector";
import StatBox from "@features/empleado/components/StatBox.jsx";
import CardReserva from "@features/empleado/components/CardReserva";

export default function EmpleadoDashboard() {
  const [reservas, setReservas] = useState([]);
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    load();
  }, [fecha]);

  async function load() {
    const dateISO = fecha.toISOString().split("T")[0];
    const { data } = await empleadoApi.getReservasByFecha(dateISO);
    setReservas(Array.isArray(data) ? data : []);
  }

  const totalReservas = reservas.length;

  return (
    <div className="p-6 space-y-6">

      {/* encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Bienvenido</h1>

        <div className="flex items-center gap-3">
          <FechaSelector fecha={fecha} setFecha={setFecha} />

          <button
            onClick={load}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            🔍 Buscar
          </button>
        </div>
      </div>

        
      {/* estadísticas */}
      <div className="grid grid-cols-1 gap-4 w-60">
        <StatBox title="Reservas" value={totalReservas} />
      </div>

      {/* lista de reservas */}
      <div className="space-y-4">
        {reservas.length === 0 ? (
            <p className="text-gray-500">No hay reservas para esta fecha.</p>
        ) : (
            reservas.map((r) => <CardReserva key={r.idReserva} reserva={r} />)
        )}
        </div>

    </div>
  );
}
