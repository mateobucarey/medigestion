import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CrearDisponibilidad() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [dias, setDias] = useState([
    { nombre: "Lunes", activo: false, hora_inicio: "", hora_fin: "" },
    { nombre: "Martes", activo: false, hora_inicio: "", hora_fin: "" },
    { nombre: "Miércoles", activo: false, hora_inicio: "", hora_fin: "" },
    { nombre: "Jueves", activo: false, hora_inicio: "", hora_fin: "" },
    { nombre: "Viernes", activo: false, hora_inicio: "", hora_fin: "" },
    { nombre: "Sábado", activo: false, hora_inicio: "", hora_fin: "" },
    { nombre: "Domingo", activo: false, hora_inicio: "", hora_fin: "" },
  ]);

  const handleChange = (index, campo, valor) => {
    const nuevosDias = [...dias];
    nuevosDias[index][campo] = valor;
    setDias(nuevosDias);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const seleccionados = dias
        .map((d, i) => ({
          id_profesional: usuario.id_usuario,
          dia_semana: i + 1, // Lunes=1 ... Domingo=7
          hora_inicio: d.hora_inicio,
          hora_fin: d.hora_fin,
        }))
        .filter((d, i) => dias[i].activo);

      if (seleccionados.length === 0) {
        alert("Seleccioná al menos un día.");
        return;
      }

      await axios.post("http://localhost:4000/api/disponibilidad/multiple", {
        disponibilidades: seleccionados,
      });

      alert("Disponibilidad configurada con éxito");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error al guardar disponibilidad");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Configurar Disponibilidad Semanal</h2>
      <form onSubmit={handleSubmit}>
        {dias.map((dia, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            <label className="w-1/4">{dia.nombre}</label>
            <input
              type="checkbox"
              checked={dia.activo}
              onChange={(e) =>
                handleChange(index, "activo", e.target.checked)
              }
            />
            <input
              type="time"
              className="border p-1 rounded w-1/4"
              value={dia.hora_inicio}
              onChange={(e) =>
                handleChange(index, "hora_inicio", e.target.value)
              }
              disabled={!dia.activo}
            />
            <input
              type="time"
              className="border p-1 rounded w-1/4"
              value={dia.hora_fin}
              onChange={(e) =>
                handleChange(index, "hora_fin", e.target.value)
              }
              disabled={!dia.activo}
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-6 w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition"
        >
          Guardar disponibilidad
        </button>
      </form>
    </div>
  );
}
