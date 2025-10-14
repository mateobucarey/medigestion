import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    mail: "",
    contrasenia: "",
    id_rol: 2,
    profesion: "",
    especialidad: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3001/api/usuarios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Asignamos valores de profesional si existen
        setForm({
          ...res.data,
          id_rol: Number(res.data.id_rol),
          profesion: res.data.profesion || "",
          especialidad: res.data.especialidad || "",
          contrasenia: "",
        });
      } catch (err) {
        alert("Error al obtener usuario");
      }
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.name === "id_rol" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3001/api/usuarios/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Usuario actualizado");
      navigate("/usuarios");
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al actualizar");
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Usuario eliminado");
      navigate("/usuarios");
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Editar Usuario</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
      <input name="mail" value={form.mail} onChange={handleChange} placeholder="Email" />
      <input name="contrasenia" value={form.contrasenia} onChange={handleChange} type="password" placeholder="Contraseña" />

      <select name="id_rol" value={form.id_rol} onChange={handleChange}>
        <option value={2}>Profesional</option>
        <option value={3}>Secretario</option>
      </select>

      {form.id_rol === 2 && (
        <>
          <input name="profesion" value={form.profesion} onChange={handleChange} placeholder="Profesión" />
          <input name="especialidad" value={form.especialidad} onChange={handleChange} placeholder="Especialidad" />
        </>
      )}

      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={handleDelete}>Eliminar usuario</button>
    </form>
  );
}
