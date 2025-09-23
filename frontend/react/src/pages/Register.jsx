import { useState } from "react";
import axios from "axios";
 
export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  //nuevos campos
  const [dni, setDni] = useState("");
  const [fechaNac, setFechaNac] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        nombre,
        apellido,
        telefono,
        mail,
        contrasenia,
        //nuevos campos
        dni,
        fecha_nac: fechaNac
      });
      alert("Usuario creado: " + res.data.user.nombre);
    } catch (err) {
      alert(err.response.data.error || "Error desconocido");
    }
  };
 
  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
      <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <input placeholder="Email" value={mail} onChange={e => setMail(e.target.value)} />
     
      <input placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
      <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />

      <input placeholder="Contraseña" type="password" value={contrasenia} onChange={e => setContrasenia(e.target.value)} />
      <button type="submit">Registrarse</button>
    </form>
  );
}