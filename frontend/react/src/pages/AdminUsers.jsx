import { useEffect, useState } from 'react';
import { listUsuarios, createUsuario, updateUsuario } from '../services/adminService';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', mail: '', contrasenia: '', telefono: '', id_rol: '2', profesion: '', especialidad: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await listUsuarios();
      if (res.success) setUsers(res.data || []);
    }
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, id_rol: Number(form.id_rol) };
    let res;
    if (editingId) {
      res = await updateUsuario(editingId, payload);
    } else {
      res = await createUsuario(payload);
    }
    if (res.success) {
      alert(editingId ? 'Usuario actualizado' : 'Usuario creado');
      const list = await listUsuarios();
      setUsers(list.data || []);
      // reset form
      setForm({ nombre: '', apellido: '', mail: '', contrasenia: '', telefono: '', id_rol: '2', profesion: '', especialidad: '' });
      setEditingId(null);
    } else alert(res.error || 'Error');
  }

  function startEdit(user) {
    setEditingId(user.id_usuario);
    setForm({
      nombre: user.nombre ?? '',
      apellido: user.apellido ?? '',
      mail: user.mail ?? '',
      contrasenia: '',
      telefono: user.telefono ?? '',
      id_rol: String(user.id_rol ?? user.id_rol ?? '3'),
      profesion: user.profesion ?? '',
      especialidad: user.especialidad ?? ''
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ nombre: '', apellido: '', mail: '', contrasenia: '', telefono: '', id_rol: '2', profesion: '', especialidad: '' });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Administrar usuarios</h2>
      <form onSubmit={submit}>
        <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <input placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
        <input placeholder="Email" value={form.mail} onChange={(e) => setForm({ ...form, mail: e.target.value })} />
        <input placeholder="Contraseña" value={form.contrasenia} onChange={(e) => setForm({ ...form, contrasenia: e.target.value })} />
        <input placeholder="Telefono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
        <div>
          <label>Rol</label>
          <select value={form.id_rol} onChange={(e) => setForm({ ...form, id_rol: e.target.value })}>
            <option value="2">Profesional</option>
            <option value="3">Secretario</option>
          </select>
        </div>

        {form.id_rol === '2' && (
          <>
            <input placeholder="Profesion" value={form.profesion} onChange={(e) => setForm({ ...form, profesion: e.target.value })} />
            <input placeholder="Especialidad" value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })} />
          </>
        )}

  <button type="submit">{editingId ? 'Guardar' : 'Crear usuario'}</button>
      </form>

      <h3>Listado</h3>
      <ul>
        {users.map(u => (
          <li key={u.id_usuario} style={{ marginBottom: 8 }}>
            {u.nombre} {u.apellido} - {u.mail} - rol:{u.id_rol}
            <button style={{ marginLeft: 8 }} onClick={() => startEdit(u)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
