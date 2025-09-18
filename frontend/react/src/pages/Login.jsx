import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        mail,
        contrasenia
      });

      // Guardamos el token en localStorage
      localStorage.setItem("token", res.data.token);
      //alert("Login exitoso: " + res.data.user.nombre);

      // Podés redirigir a dashboard u otra página
      // ejemplo con window.location:
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.error || "Error desconocido");
    }
  };

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
