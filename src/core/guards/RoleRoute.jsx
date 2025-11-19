import { Navigate } from "react-router-dom";
import { goByRole } from "@/shared/utils/roleRouting";

export default function RoleRoute({ allow, children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🚨 SOLUCIÓN AL PROBLEMA
  if (!user || !user.rolId) {
    return <Navigate to="/login" replace />;
  }

  const allowed = Array.isArray(allow) ? allow : [allow];

  if (allowed.includes(user.rolId)) {
    return children;
  }

  return <Navigate to={goByRole(user.rolId)} replace />;
}
