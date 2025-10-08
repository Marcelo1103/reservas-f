import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/Auth/LoginScreen.jsx";
import RegisterScreen from "./components/Auth/RegisterScreen.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardScreen from "./components/Dashboard/DashboardScreen.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Invitados */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registro" element={<RegisterScreen />} />

      {/* Autenticado */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardScreen />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
