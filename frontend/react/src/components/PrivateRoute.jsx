import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// rolesPermitidos = [1, 2, 3, 4]
export default function PrivateRoute({ children, rolesPermitidos }) {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Cargando sesión...</p>;

  if (!usuario) return <Navigate to="/login" />;

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.id_rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
