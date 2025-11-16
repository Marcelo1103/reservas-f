import { Navigate, Route, Routes } from "react-router-dom";

export const RoutesWithNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};
