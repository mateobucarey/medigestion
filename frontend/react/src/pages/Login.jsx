import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [mail, setMail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await login({ mail, contrasenia });
    if (res.success) {
      // navigate within SPA so AuthContext state is preserved and ProtectedRoute won't redirect
      navigate('/dashboard');
    } else {
      alert(res.error || 'Error');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
