import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ListadoUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuarios(res.data);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <Link to="/usuarios/nuevo">Crear nuevo usuario</Link>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id_usuario}>
            {usuario.nombre} {usuario.apellido} - Rol: {usuario.rol_nombre}
            <Link to={`/usuarios/editar/${usuario.id_usuario}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
