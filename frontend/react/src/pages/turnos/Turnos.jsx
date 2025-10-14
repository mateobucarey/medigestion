import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const { usuario } = useAuth(); // datos del profesional logueado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/turnos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filtramos los turnos del profesional logueado
        const turnosFiltrados = res.data.filter(
          (t) => t.id_profesional === usuario.id_usuario
        );
        setTurnos(turnosFiltrados);
      } catch (err) {
        console.error(err);
        alert("Error al obtener los turnos");
      }
    };
    if (usuario) fetchTurnos();
  }, [usuario]);

  const handleEditar = (id) => {
    navigate(`/turnos/editar/${id}`);
  };

  const handleCancelar = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar este turno?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/api/turnos/${id}`,
        { estado: "Cancelado" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTurnos((prev) =>
        prev.map((t) =>
          t.id_turno === id ? { ...t, estado: "Cancelado" } : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error al cancelar turno");
    }
  };

  return (
    <div>
      <h2>Mis Turnos</h2>
      <button onClick={() => navigate("/turnos/nuevo")}>Nuevo Turno</button>

      {turnos.length === 0 ? (
        <p>No hay turnos cargados.</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Paciente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id_turno}>
                <td>{t.fecha}</td>
                <td>{t.hora_inicio}</td>
                <td>{t.hora_fin}</td>
                <td>
                  {t.nombre_paciente} {t.apellido_paciente}
                </td>
                <td>{t.estado}</td>
                <td>
                  <button onClick={() => handleEditar(t.id_turno)}>
                    Editar
                  </button>
                  <button onClick={() => handleCancelar(t.id_turno)}>
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
