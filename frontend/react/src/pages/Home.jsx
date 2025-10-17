import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido a MediGestion</h1>
      <p>
        <Link to="/login">Iniciar sesión</Link> | <Link to="/register">Registrarse</Link> | <Link to="/buscar-turnos">Sacar turno</Link>
      </p>
    </div>
  );
}
