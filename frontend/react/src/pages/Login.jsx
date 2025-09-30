import { useState } from "react";
import axios from "axios";

// Componente principal de Login
export default function Login() {
  // Estados para email y contraseña del formulario
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // Función que maneja el submit del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    try {
      // Petición POST al backend con los datos ingresados
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        mail,
        contrasenia,
      });

      // Si es exitoso, guarda el token en localStorage
      localStorage.setItem("token", res.data.token);

      // Redirige al dashboard (o donde quieras)
      window.location.href = "/dashboard";
    } catch (err) {
      // Muestra mensaje de error (si lo hay) o uno genérico
      alert(err.response?.data?.error || "Error desconocido");
    }
  };

  // Renderiza el formulario de login
  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}
