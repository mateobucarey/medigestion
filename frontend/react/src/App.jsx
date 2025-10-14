import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"; 

// --------------------
// Módulo Usuarios (Admin)
// --------------------
import ListadoUsuarios from "./pages/usuarios/ListadoUsuarios";
import CrearUsuario from "./pages/usuarios/CrearUsuario";
import EditarUsuario from "./pages/usuarios/EditarUsuario";

// --------------------
// Módulo Turnos (Profesional)
// --------------------
import Turnos from "./pages/turnos/Turnos";
import NuevoTurno from "./pages/turnos/NuevoTurno";
import EditarTurno from "./pages/turnos/EditarTurno";
import ListarTurnos from "./pages/turnos/ListarTurnos";

// --------------------
// Módulo Disponibilidad (Profesional)
// --------------------
import Disponibilidad from "./pages/disponibilidad/DisponibilidadProfesional";
import CrearDisponibilidad from "./pages/disponibilidad/CrearDisponibilidad";
import EditarDisponibilidad from "./pages/disponibilidad/EditarDisponibilidad";

import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MenuLateral from "./components/MenuLateral";

// ----------------------------------------
// LayoutPrivado
// ----------------------------------------
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

// ----------------------------------------
// App principal
// ----------------------------------------
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ----------------------- */}
          {/* Rutas públicas */}
          {/* ----------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ----------------------- */}
          {/* Rutas privadas */}
          {/* ----------------------- */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute rolesPermitidos={[1,2,3,4]}>
                <LayoutPrivado>
                  <Dashboard />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />

          {/* ----------------------- */}
          {/* Módulo Usuarios - Admin */}
          {/* ----------------------- */}
          <Route
            path="/usuarios"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <LayoutPrivado>
                  <ListadoUsuarios />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios/nuevo"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <LayoutPrivado>
                  <CrearUsuario />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios/editar/:id"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <LayoutPrivado>
                  <EditarUsuario />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />

          {/* ----------------------- */}
          {/* Módulo Turnos - Profesional */}
          {/* ----------------------- */}
          <Route
            path="/turnos"
            element={
              <PrivateRoute rolesPermitidos={[2]}>
                <LayoutPrivado>
                  <Turnos />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />
          <Route
            path="/turnos/nuevo"
            element={
              <PrivateRoute rolesPermitidos={[2]}>
                <LayoutPrivado>
                  <NuevoTurno />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />
          <Route
            path="/turnos/editar/:id"
            element={
              <PrivateRoute rolesPermitidos={[2]}>
                <LayoutPrivado>
                  <EditarTurno />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />

          {/* ----------------------- */}
          {/* Módulo Disponibilidad - Profesional */}
          {/* ----------------------- */}
          <Route
            path="/disponibilidad"
            element={
              <PrivateRoute rolesPermitidos={[2]}>
                <LayoutPrivado>
                  <Disponibilidad />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />
          <Route
            path="/disponibilidad/nueva"
            element={
              <PrivateRoute rolesPermitidos={[2]}>
                <LayoutPrivado>
                  <CrearDisponibilidad />
                </LayoutPrivado>
              </PrivateRoute>
            }
          />
          <Route
            path="/disponibilidad/editar/:id"
            element={
              <PrivateRoute rolesPermitidos={[2]}>
                <LayoutPrivado>
                  <EditarDisponibilidad />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
