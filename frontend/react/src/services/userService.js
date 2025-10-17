import api from './api/api';

export async function getPerfil(id) {
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
}

export async function updatePerfil(id, payload) {
  const res = await api.put(`/usuarios/${id}`, payload);
  return res.data;
}
