import api from './api/api';

export async function listObras() {
  const res = await api.get('/obras-sociales');
  return res.data;
}
