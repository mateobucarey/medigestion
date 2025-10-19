import api from './api/api';

export async function getAcceptedPlans() {
  const res = await api.get('/profesional-plans');
  return res.data;
}

// payload can be: { plans: [...], id_obra, obra_nombre, plan_tipo }
export async function setAcceptedPlans(payload) {
  const res = await api.post('/profesional-plans', payload);
  return res.data;
}
