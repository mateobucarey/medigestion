// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido a MediGestión 🩺</h1>
      <p>Tu sistema integral para la gestión médica.</p>

      <div style={{ marginTop: "1rem" }}>
        <Link to="/login">Iniciar sesión</Link> |{" "}
        <Link to="/register">Registrarse</Link>
      </div>
    </div>
  );
}
