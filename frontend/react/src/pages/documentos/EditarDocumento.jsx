// src/pages/clinica/EditarDocumento.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarDocumento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    id_paciente: "",
    titulo: "",
    contenido: "",
    compartir_con_paciente: false,
  });
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPacientes();
    fetchDocumento();
  }, []);

  const fetchPacientes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/pacientes");
      setPacientes(res.data);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
    }
  };

  const fetchDocumento = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/documentos/id/${id}`);
      const { id_paciente, titulo, contenido, compartir_con_paciente } = res.data;
      setForm({ id_paciente, titulo, contenido, compartir_con_paciente });
    } catch (err) {
      console.error("Error al cargar documento:", err);
      alert("No se pudo cargar el documento");
      navigate("/documentos");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("id_paciente", form.id_paciente);
      data.append("titulo", form.titulo);
      data.append("contenido", form.contenido);
      data.append("compartir_con_paciente", form.compartir_con_paciente);
      if (archivo) data.append("archivo", archivo);

      await axios.put(`http://localhost:4000/api/documentos/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Documento actualizado correctamente");
      navigate("/documentos");
    } catch (error) {
      console.error("Error al actualizar documento:", error);
      alert("No se pudo actualizar el documento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-600">
        Editar Documento Médico
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Paciente</label>
          <select
            name="id_paciente"
            value={form.id_paciente}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Seleccionar...</option>
            {pacientes.map((p) => (
              <option key={p.id_paciente} value={p.id_paciente}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Título del documento</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Contenido</label>
          <textarea
            name="contenido"
            value={form.contenido}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Adjuntar archivo (opcional)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png,.docx"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="compartir_con_paciente"
            checked={form.compartir_con_paciente}
            onChange={handleChange}
          />
          <label className="text-gray-700">Compartir con el paciente</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          {loading ? "Actualizando..." : "Actualizar Documento"}
        </button>
      </form>
    </div>
  );
}
