// Importación de hooks de React
import { createContext, useContext, useEffect, useState } from "react";

// Importación de axios para hacer llamadas HTTP
import axios from "axios";

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Componente proveedor del contexto que envuelve toda la app
export const AuthProvider = ({ children }) => {
  // Estado para guardar el usuario logueado
  const [usuario, setUsuario] = useState(null);
  // Estado para indicar si se está cargando la sesión
  const [loading, setLoading] = useState(true);

  // Función que obtiene los datos del usuario desde el backend si hay token
  const getUser = async () => {
    const token = localStorage.getItem("token");

    // Si no hay token, no hay usuario
    if (!token) {
      setUsuario(null);
      setLoading(false);
      return;
    }

    try {
      // Llamada a la API para obtener el usuario actual
      const res = await axios.get("http://localhost:3001/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Guardamos los datos del usuario en el estado
      setUsuario(res.data.user);
    } catch (err) {
      // Si hay error, se limpia la sesión y el token
      console.error("Error al obtener usuario:", err);
      localStorage.removeItem("token");
      setUsuario(null);
    } finally {
      // Siempre desactiva el loading
      setLoading(false);
    }
  };

  // Al cargar el componente, intenta obtener al usuario automáticamente
  useEffect(() => {
    getUser();
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token"); // Elimina token
    setUsuario(null);                 // Limpia estado del usuario
    window.location.href = "/login"; // Redirige al login
  };

  // Retorna el proveedor con los valores que queremos compartir
  return (
    <AuthContext.Provider value={{ usuario, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto fácilmente
export const useAuth = () => useContext(AuthContext);
