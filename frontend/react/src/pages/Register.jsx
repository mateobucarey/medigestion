import { useState } from "react";
import axios from "axios";

// Componente principal de registro
export default function Register() {
  // Estados para los datos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // Nuevos campos adicionales
  const [dni, setDni] = useState("");
  const [fechaNac, setFechaNac] = useState("");

  // Función que maneja el submit del formulario
  const handleRegister = async (e) => {
    e.preventDefault(); // Previene recarga de página

    try {
      // Envía los datos del formulario al backend (POST)
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        nombre,
        apellido,
        telefono,
        mail,
        contrasenia,
        dni,
        fecha_nac: fechaNac,
      });

      // Muestra mensaje de éxito con el nombre del nuevo usuario
      alert("Usuario creado: " + res.data.user.nombre);
    } catch (err) {
      // Muestra error específico si existe, o genérico
      alert(err.response.data.error || "Error desconocido");
    }
  };

  // Renderiza el formulario de registro
  return (
    <form onSubmit={handleRegister}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        placeholder="Apellido"
        value={apellido}
        onChange={e => setApellido(e.target.value)}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
      />
      <input
        placeholder="Email"
        value={mail}
        onChange={e => setMail(e.target.value)}
      />
      <input
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <input
        type="date"
        value={fechaNac}
        onChange={(e) => setFechaNac(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={contrasenia}
        onChange={e => setContrasenia(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
