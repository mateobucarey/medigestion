import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DisponibilidadProfesional() {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const idProfesional = localStorage.getItem("id_usuario");

  useEffect(() => {
    axios.get(`http://localhost:4000/api/disponibilidad/${idProfesional}`)
      .then((res) => setDisponibilidades(res.data))
      .catch((err) => console.error(err));
  }, [idProfesional]);

  const eliminarDisponibilidad = async (id) => {
    if (!window.confirm("¿Eliminar esta disponibilidad?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/disponibilidad/${id}`);
      setDisponibilidades(disponibilidades.filter(d => d.id_disponibilidad !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-600">
        Configurar Disponibilidad
      </h2>

      <Link
        to="/disponibilidad/nueva"
        className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
      >
        + Agregar Disponibilidad
      </Link>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-emerald-100">
            <th className="p-2">Día</th>
            <th className="p-2">Hora Inicio</th>
            <th className="p-2">Hora Fin</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {disponibilidades.map((d) => (
            <tr key={d.id_disponibilidad} className="border-t">
              <td className="p-2">{d.dia_semana}</td>
              <td className="p-2">{d.hora_inicio}</td>
              <td className="p-2">{d.hora_fin}</td>
              <td className="p-2 space-x-2">
                <Link
                  to={`/disponibilidad/editar/${d.id_disponibilidad}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => eliminarDisponibilidad(d.id_disponibilidad)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
