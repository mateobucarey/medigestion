import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getPerfil, updatePerfil } from '../services/userService';

export default function Perfil() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ nombre: '', apellido: '', telefono: '' });

  useEffect(() => {
    async function load() {
      if (!user) return;
      const res = await getPerfil(user.id);
      if (res.success) setForm({ nombre: res.data.nombre ?? '', apellido: res.data.apellido ?? '', telefono: res.data.telefono ?? '' });
    }
    load();
  }, [user]);

  async function submit(e) {
    e.preventDefault();
    const res = await updatePerfil(user.id, form);
    if (res.success) {
      alert('Perfil actualizado');
      setUser({ ...user, nombre: form.nombre, apellido: form.apellido });
    } else alert(res.error || 'Error');
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Editar Perfil</h2>
      <form onSubmit={submit}>
  <input placeholder="Nombre" value={form.nombre ?? ''} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
  <input placeholder="Apellido" value={form.apellido ?? ''} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
  <input placeholder="Telefono" value={form.telefono ?? ''} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
