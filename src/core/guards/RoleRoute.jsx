import { Navigate } from "react-router-dom";
import { goByRole } from "@/shared/utils/roleRouting";

export default function RoleRoute({ allow, children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const allowed = Array.isArray(allow) ? allow : [allow];

 // Si el rol está permitido - mostrar pantalla
  if (allowed.includes(user.rolId)) {
    return children;
  }

  // Si NO tiene permiso - redirigir según su rol
  return <Navigate to={goByRole(user.rolId)} replace />;
}
