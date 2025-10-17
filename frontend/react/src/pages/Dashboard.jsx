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
    </div>
  );
}
