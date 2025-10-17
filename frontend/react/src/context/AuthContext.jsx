import { createContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function parseJwt(token) {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload) setUser({ id: payload.id, rol: payload.rol, token });
      else setUser(null);
    }
  }, []);

  async function login(creds) {
    const res = await apiLogin(creds);
    if (res.success && res.data.token) {
      localStorage.setItem('token', res.data.token);
      // set user object from returned user if present, else decode
      if (res.data.user) {
        // backend may return id_rol, normalize to 'rol'
        const u = { ...res.data.user, token: res.data.token };
        if (u.id_rol !== undefined && u.rol === undefined) u.rol = u.id_rol;
        setUser(u);
      } else {
        const payload = parseJwt(res.data.token);
        if (payload) setUser({ id: payload.id, rol: payload.rol, token: res.data.token });
        else setUser({ token: res.data.token });
      }
    }
    return res;
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
