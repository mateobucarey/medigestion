import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Configuración del header con Bearer token
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Llamada al backend para obtener datos del usuario
    axios
      .get("http://localhost:3001/api/auth/me", config)
      .then((res) => {
        setUsuario(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Bienvenido, {usuario.nombre} {usuario.apellido}</h1>
      <p>Email: {usuario.mail}</p>
      <p>Rol ID: {usuario.id_rol}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
