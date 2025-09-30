import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MenuLateral from "./components/MenuLateral";

// ----------------------------------------
// LayoutPrivado
// Layout que se muestra solo cuando hay sesión activa
// Incluye el menú lateral y el contenido principal
// ----------------------------------------
function LayoutPrivado({ children }) {
  const { usuario } = useAuth(); // Obtenemos usuario desde el contexto

  // Si no hay usuario, no renderiza nada
  if (!usuario) return null;

  // Renderiza el menú lateral y el contenido principal
  return (
    <div style={{ display: "flex" }}>
      <MenuLateral />
      <div style={{ flex: 1, padding: "1rem" }}>{children}</div>
    </div>
  );
}

// ----------------------------------------
// Componente principal App
// ----------------------------------------
function App() {
  return (
    // Proveedor de autenticación global
    <AuthProvider>
      {/* Configuración del router */}
      <Router>
        <Routes>

          {/* ----------------------- */}
          {/* Rutas públicas */}
          {/* ----------------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ----------------------- */}
          {/* Rutas privadas */}
          {/* ----------------------- */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <LayoutPrivado>
                  <Dashboard />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />

          {/* ----------------------- */}
          {/* Página de acceso denegado */}
          {/* ----------------------- */}
          <Route path="/unauthorized" element={<p>No tenés permiso</p>} />

          {/* ----------------------- */}
          {/* Redirección por defecto */}
          {/* ----------------------- */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
