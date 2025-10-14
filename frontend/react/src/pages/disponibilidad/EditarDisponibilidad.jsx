import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarDisponibilidad() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dia_semana: "",
    hora_inicio: "",
    hora_fin: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/disponibilidad/id/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/disponibilidad/${id}`, form);
      navigate("/disponibilidad");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la disponibilidad");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-600">
        Editar Disponibilidad
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Día de la semana</label>
          <select
            name="dia_semana"
            value={form.dia_semana}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Hora inicio</label>
          <input
            type="time"
            name="hora_inicio"
            value={form.hora_inicio}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Hora fin</label>
          <input
            type="time"
            name="hora_fin"
            value={form.hora_fin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}