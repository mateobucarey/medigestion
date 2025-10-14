import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarTurno() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turno, setTurno] = useState({
    id_profesional: "",
    id_paciente: "",
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "Pendiente",
  });

  const [pacientes, setPacientes] = useState([]);
  const [profesionales, setProfesionales] = useState([]);

  // Traer datos del turno
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:3001/api/turnos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setTurno(res.data))
    .catch(err => alert("Error al cargar turno"));

    // Traer pacientes
    axios.get("http://localhost:3001/api/pacientes", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setPacientes(res.data))
    .catch(err => console.error(err));

    // Traer profesionales
    axios.get("http://localhost:3001/api/profesionales", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setProfesionales(res.data))
    .catch(err => console.error(err));

  }, [id]);

  const handleChange = (e) => {
    setTurno({ ...turno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:3001/api/turnos/${id}`, turno, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Turno actualizado");
      navigate("/turnos");
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al actualizar turno");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Turno</h2>

      <select name="id_profesional" value={turno.id_profesional} onChange={handleChange}>
        <option value="">Seleccione Profesional</option>
        {profesionales.map(p => (
          <option key={p.id_usuario} value={p.id_usuario}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <select name="id_paciente" value={turno.id_paciente} onChange={handleChange}>
        <option value="">Seleccione Paciente</option>
        {pacientes.map(p => (
          <option key={p.id_usuario} value={p.id_usuario}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <input type="date" name="fecha" value={turno.fecha} onChange={handleChange} />
      <input type="time" name="hora_inicio" value={turno.hora_inicio} onChange={handleChange} />
      <input type="time" name="hora_fin" value={turno.hora_fin} onChange={handleChange} />

      <select name="estado" value={turno.estado} onChange={handleChange}>
        <option value="Pendiente">Pendiente</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Cancelado">Cancelado</option>
      </select>

      <button type="submit">Actualizar Turno</button>
    </form>
  );
}
