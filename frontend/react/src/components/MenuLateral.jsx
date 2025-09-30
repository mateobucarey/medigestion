// Importación de hooks de React
import { useEffect, useState } from "react";

// Axios para llamadas HTTP
import axios from "axios";

// Link de React Router para navegación interna
import { Link } from "react-router-dom";

// Componente principal
export default function MenuLateral() {
  // Estado para guardar el menú traído desde el backend
  const [menu, setMenu] = useState([]);

  // Al montar el componente, obtenemos el menú del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hace nada

    // Llama a la API para traer las opciones del menú según el rol
    axios
      .get("http://localhost:3001/api/menu", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Guarda el array de ítems del menú
        setMenu(res.data.menu);
      })
      .catch((err) => {
        console.error("Error al obtener menú:", err);
      });
  }, []);

  // Renderiza el menú como una lista de enlaces
  return (
    <nav style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h3>Menú</h3>
      <ul>
        {menu.map((item) => (
          <li key={item.idmenu}>
            <Link to={item.medireccion}>{item.menombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
