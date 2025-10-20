import api from './api/api';

export async function listMisTurnos() {
  const res = await api.get('/turnos/mis-turnos');
  return res.data;
}

export async function cancelarTurno(id) {
  const res = await api.post(`/turnos/${id}/cancelar`);
  return res.data;
}

// Secretaría / admin endpoints
export async function listAllTurnos() {
  const res = await api.get('/turnos');
  return res.data;
}

export async function listTurnosFiltered(params) {
  const res = await api.get('/turnos', { params });
  return res.data;
}

export async function searchAvailableSlots(filters) {
  const res = await api.get('/turnos/buscar', { params: filters });
  return res.data;
}

export async function reservarSlot(payload) {
  // payload: { id_profesional, id_paciente, fecha, hora_inicio, hora_fin }
  const res = await api.post('/turnos', payload);
  return res.data;
}

export async function createTurno(payload) {
  const res = await api.post('/turnos', payload);
  return res.data;
}

export async function updateTurno(id, payload) {
  const res = await api.put(`/turnos/${id}`, payload);
  return res.data;
}
