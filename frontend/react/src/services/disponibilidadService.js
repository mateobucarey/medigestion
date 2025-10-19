import api from './api/api';

export async function listDisponibilidades() {
  const res = await api.get('/disponibilidad');
  return res.data;
}

export async function createDisponibilidad(payload) {
  const res = await api.post('/disponibilidad', payload);
  return res.data;
}

export async function updateDisponibilidad(id, payload) {
  const res = await api.put(`/disponibilidad/${id}`, payload);
  return res.data;
}

export async function deleteDisponibilidad(id) {
  const res = await api.delete(`/disponibilidad/${id}`);
  return res.data;
}
