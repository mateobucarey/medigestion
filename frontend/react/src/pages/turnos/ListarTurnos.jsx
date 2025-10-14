import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListarTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/turnos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTurnos(res.data);
      } catch (err) {
        console.error(err);
        alert("Error al cargar los turnos");
      } finally {
        setLoading(false);
      }
    };
    fetchTurnos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este turno?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/turnos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTurnos(turnos.filter((t) => t.id_turno !== id));
      alert("Turno eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar turno");
    }
  };

  const turnosFiltrados = turnos.filter(
    (t) =>
      `${t.nombre_paciente} ${t.apellido_paciente}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      `${t.nombre_profesional} ${t.apellido_profesional}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

  if (loading) return <p>Cargando turnos...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Turnos</h2>
        <button
          onClick={() => navigate("/turnos/nuevo")}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          + Nuevo Turno
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por paciente o profesional..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border p-2 w-full mb-4 rounded-lg"
      />

      {turnosFiltrados.length === 0 ? (
        <p>No hay turnos registrados</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Paciente</th>
              <th className="p-2 border">Profesional</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Hora Inicio</th>
              <th className="p-2 border">Hora Fin</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnosFiltrados.map((t) => (
              <tr key={t.id_turno}>
                <td className="border p-2">
                  {t.nombre_paciente} {t.apellido_paciente}
                </td>
                <td className="border p-2">
                  {t.nombre_profesional} {t.apellido_profesional}
                </td>
                <td className="border p-2">{t.fecha.split("T")[0]}</td>
                <td className="border p-2">{t.hora_inicio}</td>
                <td className="border p-2">{t.hora_fin}</td>
                <td className="border p-2">{t.estado}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => navigate(`/turnos/editar/${t.id_turno}`)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id_turno)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
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
