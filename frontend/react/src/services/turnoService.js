import api from './api/api';

export async function listMisTurnos() {
  const res = await api.get('/turnos/mis-turnos');
  return res.data;
}

export async function cancelarTurno(id) {
  const res = await api.post(`/turnos/${id}/cancelar`);
  return res.data;
}
