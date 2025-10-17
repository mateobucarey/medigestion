import api from './api/api';

export async function listPlanes(obraId) {
  const res = await api.get('/planes' + (obraId ? `?obraId=${obraId}` : ''));
  return res.data;
}
