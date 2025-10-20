import api from './api/api';

export async function listPacientes() {
  const res = await api.get('/pacientes');
  return res.data;
}

export async function searchPacientes(q) {
  const res = await api.get('/pacientes', { params: { q } });
  return res.data;
}

export async function getPaciente(id) {
  const res = await api.get(`/pacientes/${id}`);
  return res.data;
}

export async function registerPaciente(payload) {
  const res = await api.post('/pacientes', payload);
  return res.data;
}

