// src/pages/clinica/ListarDocumentos.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListarDocumentos() {
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  // Cargar documentos
  useEffect(() => {
    fetchDocumentos();
    fetchPacientes();
  }, []);

  const fetchDocumentos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/documentos");
      setDocumentos(res.data);
    } catch (err) {
      console.error("Error al cargar documentos:", err);
    }
  };

  const fetchPacientes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/pacientes");
      setPacientes(res.data);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
    }
  };

  // Filtrar documentos
  const documentosFiltrados = documentos.filter((d) => {
    const matchPaciente = filtroPaciente ? d.id_paciente === filtroPaciente : true;
    const matchFecha = filtroFecha ? d.fecha_creacion?.split("T")[0] === filtroFecha : true;
    return matchPaciente && matchFecha;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-600">Documentos Médicos</h2>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <select
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(Number(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Todos los pacientes</option>
          {pacientes.map((p) => (
            <option key={p.id_paciente} value={p.id_paciente}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Tabla de documentos */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-emerald-100">
            <th className="border px-4 py-2 text-left">Paciente</th>
            <th className="border px-4 py-2 text-left">Título</th>
            <th className="border px-4 py-2 text-left">Fecha Creación</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documentosFiltrados.map((doc) => (
            <tr key={doc.id_documento} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{doc.nombre} {doc.apellido}</td>
              <td className="border px-4 py-2">{doc.titulo}</td>
              <td className="border px-4 py-2">{doc.fecha_creacion?.split("T")[0]}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => navigate(`/documentos/${doc.id_documento}`)}
                  className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                >
                  Ver
                </button>
                <button
                  onClick={() => navigate(`/documentos/editar/${doc.id_documento}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}

          {documentosFiltrados.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No hay documentos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
