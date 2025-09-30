// ----------------------------------------
// 🧭 Dashboard.jsx
// Página principal que se muestra luego del login (solo con sesión activa)
// ----------------------------------------

import { useEffect, useState } from "react";
import axios from "axios";

// Componente principal del dashboard
export default function Dashboard() {
  // Estado para guardar los datos del usuario logueado
  const [usuario, setUsuario] = useState(null);

  // Al montar el componente, obtenemos los datos del usuario desde el backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Configuramos el header con el token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Hacemos la petición al backend para obtener los datos del usuario
    axios
      .get("http://localhost:3001/api/auth/me", config)
      .then((res) => {
        setUsuario(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Función para cerrar sesión manualmente
  const handleLogout = () => {
    localStorage.removeItem("token"); // Borra el token
    window.location.href = "/login";  // Redirige al login
  };

  // Mientras no se haya cargado el usuario, mostramos un loading
  if (!usuario) return <div>Cargando...</div>;

  // Si hay usuario, mostramos los datos personales y un botón para cerrar sesión
  return (
    <div>
      <h1>Bienvenido, {usuario.nombre} {usuario.apellido}</h1>
      <p>Email: {usuario.mail}</p>
      <p>Rol ID: {usuario.id_rol}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
