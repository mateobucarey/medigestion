import api from './api/api';

export async function login({ mail, contrasenia }) {
  const res = await api.post('/auth/login', { mail, contrasenia });
  return res.data;
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function logout() {
  localStorage.removeItem('token');
}
