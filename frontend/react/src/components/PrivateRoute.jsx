import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// rolesPermitidos: array de roles que tienen acceso a esta ruta
export default function PrivateRoute({ children, rolesPermitidos }) {
  const { usuario, loading } = useAuth(); // Obtenemos el usuario y si aún se está cargando la sesión

  // Mientras se carga la sesión, mostramos un mensaje
  if (loading) return <p>Cargando sesión...</p>;

  // Si no hay usuario logueado, redirige al login
  if (!usuario) return <Navigate to="/login" />;

  // Si hay restricción por roles y el usuario no está autorizado, redirige a /unauthorized
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.id_rol)) {
    return <Navigate to="/unauthorized" />;
  }

  // Si pasa todas las validaciones, renderiza el contenido hijo (la página protegida)
  return children;
}
