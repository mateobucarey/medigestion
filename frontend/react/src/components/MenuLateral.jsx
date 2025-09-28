import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MenuLateral() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3001/api/menu", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMenu(res.data.menu);
      })
      .catch((err) => {
        console.error("Error al obtener menú:", err);
      });
  }, []);

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
