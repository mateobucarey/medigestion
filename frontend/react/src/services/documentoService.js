import api from './api/api';

export async function uploadDocumento(formData) {
  const res = await api.post('/documentos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return res.data;
}

export async function listDocumentosByTurno(turnoId) {
  const res = await api.get(`/documentos/turno/${turnoId}`);
  return res.data;
}
