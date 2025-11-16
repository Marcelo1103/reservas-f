import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "@/features/auth/components/LoginScreen";
import RegisterScreen from "@/features/auth/components/RegisterScreen";

import { PrivateGuard } from "@/core/guards/PrivateGuard";
import RoleRoute from "@/core/guards/RoleRoute";

import DashboardScreen from "@/features/dashboard/components/DashboardScreen";
import AdminScreen from "@/features/dashboard/components/AdminScreen";
import EmpleadoScreen from "@/features/dashboard/components/EmpleadoScreen";

import { ROLES } from "@/shared/utils/roleRouting";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/registro" element={<RegisterScreen />} />

        {/* PRIVATE (requiere token) */}
        <Route element={<PrivateGuard />}>

          {/* DASHBOARD GENERAL (todas las cuentas) */}
          <Route path="/dashboard" element={<DashboardScreen />} />

          {/* SOLO ADMIN */}
          <Route
            path="/admin"
            element={
              <RoleRoute allow={[ROLES.ADMIN]}>
                <AdminScreen />
              </RoleRoute>
            }
          />

          {/* SOLO EMPLEADOS */}
          <Route
            path="/empleado"
            element={
              <RoleRoute allow={[ROLES.EMPLEADO]}>
                <EmpleadoScreen />
              </RoleRoute>
            }
          />

        </Route>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
