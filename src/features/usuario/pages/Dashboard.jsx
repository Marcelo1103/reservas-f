import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-center mb-8 text-3xl font-bold text-gray-900">
        Bienvenido, {user.nombre}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card: Hacer Reserva */}
        <Link
          to="/usuario/reservar"
          className="
            p-6 bg-white border border-gray-200 rounded-xl shadow-sm 
            hover:shadow-md hover:border-blue-500 transition-all cursor-pointer
          "
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Hacer una Reserva
          </h2>
          <p className="text-gray-600 text-sm">
            Elige entre las mesas disponibles y agenda una fecha y hora.
          </p>
        </Link>

        {/* Card: Mis Reservas */}
        <Link
          to="/usuario/mis-reservas"
          className="
            p-6 bg-white border border-gray-200 rounded-xl shadow-sm 
            hover:shadow-md hover:border-blue-500 transition-all cursor-pointer
          "
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Mis Reservas
          </h2>
          <p className="text-gray-600 text-sm">
            Consulta, edita o cancela tus reservas activas.
          </p>
        </Link>

        {/* Card: Perfil */}
        <Link
          to="/usuario/perfil"
          className="
            p-6 bg-white border border-gray-200 rounded-xl shadow-sm 
            hover:shadow-md hover:border-blue-500 transition-all cursor-pointer
          "
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Mi Perfil
          </h2>
          <p className="text-gray-600 text-sm">
            Información personal registrada en el sistema.
          </p>
        </Link>

        {/* Card: Notificaciones */}
        <Link
          to="/usuario/notificaciones"
          className="
            p-6 bg-white border border-gray-200 rounded-xl shadow-sm 
            hover:shadow-md hover:border-blue-500 transition-all cursor-pointer
          "
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Notificaciones
          </h2>
          <p className="text-gray-600 text-sm">
            Mensajes y avisos relacionados con tus reservas.
          </p>
        </Link>
      </div>
    </div>
  );
}
