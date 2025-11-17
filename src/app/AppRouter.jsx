import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "@/features/auth/components/LoginScreen";
import RegisterScreen from "@/features/auth/components/RegisterScreen";

import UserLayout from "@features/usuario/components/UserLayout";
import Dashboard from "@features/usuario/pages/Dashboard";
import ReservaForm from "@features/usuario/pages/ReservaForm";
import ReservaMesas from "@features/usuario/pages/ReservaMesas";
import ReservaConfirmacion from "@features/usuario/pages/ReservaConfirmacion";
import MisReservas from "@features/usuario/pages/MisReservas";
import ReservaDetalle from "@features/usuario/pages/ReservaDetalle";
import Perfil from "@features/usuario/pages/Perfil";
import Notificaciones from "@features/usuario/pages/Notificaciones";

import PrivateGuard from "@/core/guards/PrivateGuard";
import RoleRoute from "@/core/guards/RoleRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* RUTAS PUBLICAS */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* 🔐 RUTAS PRIVADAS (TOKEN NECESARIO) */}
        <Route element={<PrivateGuard />}>

          {/* Layout del usuario */}
          <Route element={<UserLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/reservar" element={<ReservaForm />} />
            <Route path="/reservar/mesas" element={<ReservaMesas />} />
            <Route path="/reservar/confirmar" element={<ReservaConfirmacion />} />

            <Route path="/mis-reservas" element={<MisReservas />} />
            <Route path="/mis-reservas/:id" element={<ReservaDetalle />} />

            <Route path="/perfil" element={<Perfil />} />
            <Route path="/notificaciones" element={<Notificaciones />} />

          </Route>

          {/* EMPLEADO (rol = 3) */}
          <Route
            path="/empleado"
            element={
              <RoleRoute allow={3}>
                <h1>Dashboard Empleado</h1>
              </RoleRoute>
            }
          />

          {/* ADMINISTRADOR (rol = 1) */}
          <Route
            path="/admin"
            element={
              <RoleRoute allow={1}>
                <h1>Dashboard Administrador</h1>
              </RoleRoute>
            }
          />

        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
