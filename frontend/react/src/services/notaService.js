import api from './api/api';

export async function createNota(payload) {
  const res = await api.post('/notas-clinicas', payload);
  return res.data;
}

export async function listNotasByTurno(turnoId) {
  const res = await api.get(`/notas-clinicas/turno/${turnoId}`);
  return res.data;
}

export async function listNotasByPaciente(pacienteId) {
  const res = await api.get(`/notas-clinicas/paciente/${pacienteId}`);
  return res.data;
}
