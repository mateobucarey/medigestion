import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>Bienvenido {user?.nombre || user?.mail || 'usuario'}.</p>
      <p>
        <Link to="/perfil">Editar perfil</Link>
      </p>
      {user?.rol === 1 && (
        <p>
          <Link to="/admin">Administrar usuarios</Link>
        </p>
      )}
      {user?.rol === 2 && (
        <p>
          <Link to="/disponibilidad">Mi disponibilidad</Link>
        </p>
      )}
      {user?.rol === 2 && (
        <p>
          <Link to="/mis-planes">Mis obras/planes</Link>
        </p>
      )}
      {user?.rol === 2 && (
        <p>
          <Link to="/mis-turnos">Mis turnos</Link>
        </p>
      )}
      {user?.rol === 2 && (
        <p>
          <Link to="/notas">Notas clínicas</Link>
        </p>
      )}
      {user?.rol === 2 && (
        <p>
          <Link to="/documentos">Documentos</Link>
        </p>
      )}
    </div>
  );
}
