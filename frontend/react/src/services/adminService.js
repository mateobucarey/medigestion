import api from './api/api';

export async function listUsuarios() {
  const res = await api.get('/admin/usuarios');
  return res.data;
}

export async function createUsuario(payload) {
  const res = await api.post('/admin/usuarios', payload);
  return res.data;
}

export async function updateUsuario(id, payload) {
  const res = await api.put(`/admin/usuarios/${id}`, payload);
  return res.data;
}
