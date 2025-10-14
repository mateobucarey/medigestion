import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NuevoTurno() {
  const { usuario } = useAuth(); // el profesional logueado
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    id_paciente: "",
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "pendiente",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPacientes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/pacientes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPacientes(res.data);
      } catch (err) {
        console.error(err);
        alert("Error al cargar pacientes");
      }
    };

    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formConProfesional = { ...form, id_profesional: usuario.id_usuario };
      await axios.post("http://localhost:3001/api/turnos", formConProfesional, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Turno creado correctamente");
      navigate("/turnos");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.mensaje || "Error al crear turno");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nuevo Turno</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label>
          Paciente:
          <select name="id_paciente" value={form.id_paciente} onChange={handleChange} required>
            <option value="">Seleccionar paciente</option>
            {pacientes.map((p) => (
              <option key={p.id_paciente} value={p.id_paciente}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha:
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>

        <label>
          Hora inicio:
          <input type="time" name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required />
        </label>

        <label>
          Hora fin:
          <input type="time" name="hora_fin" value={form.hora_fin} onChange={handleChange} required />
        </label>

        <button type="submit" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600">
          Crear Turno
        </button>
      </form>
    </div>
  );
}
