import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MenuLateral from "./components/MenuLateral";

// Layout que solo se muestra cuando hay sesión activa
function LayoutPrivado({ children }) {
  const { usuario } = useAuth();

  if (!usuario) return null;

  return (
    <div style={{ display: "flex" }}>
      <MenuLateral />
      <div style={{ flex: 1, padding: "1rem" }}>{children}</div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Páginas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Páginas privadas con layout y menú */}
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

          {/* Página de acceso denegado */}
          <Route path="/unauthorized" element={<p>No tenés permiso</p>} />

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
