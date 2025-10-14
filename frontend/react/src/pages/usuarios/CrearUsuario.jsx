import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CrearUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    mail: "",
    contrasenia: "",
    id_rol: 2, // por defecto profesional
    profesion: "",
    especialidad: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.name === "id_rol" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/usuarios", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Usuario creado");
      navigate("/usuarios");
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al crear usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Usuario</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="mail" placeholder="Email" onChange={handleChange} />
      <input name="contrasenia" type="password" placeholder="Contraseña" onChange={handleChange} />

      <select name="id_rol" value={form.id_rol} onChange={handleChange}>
        <option value={2}>Profesional</option>
        <option value={3}>Secretario</option>
      </select>

      {/* Campos adicionales solo para profesional */}
      {form.id_rol === 2 && (
        <>
          <input name="profesion" placeholder="Profesión" onChange={handleChange} />
          <input name="especialidad" placeholder="Especialidad" onChange={handleChange} />
        </>
      )}

      <button type="submit">Crear</button>
    </form>
  );
}
