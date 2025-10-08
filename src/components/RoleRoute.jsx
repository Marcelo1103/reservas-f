import { Navigate } from "react-router-dom";
import { goByRole } from "../utils/roleRouting";

export default function RoleRoute({ allow, children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const allowed = Array.isArray(allow) ? allow : [allow];

  return allowed.includes(user.rolId)
    ? children
    : <Navigate to={goByRole(user.rolId)} replace />;
}
