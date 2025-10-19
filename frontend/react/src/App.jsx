import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Perfil from './pages/Perfil';
import AdminUsers from './pages/AdminUsers';
import Disponibilidad from './pages/Disponibilidad';
import NotasClinicas from './pages/NotasClinicas';
import Documentos from './pages/Documentos';
import MisTurnos from './pages/MisTurnos';
import ProfesionalPlanes from './pages/ProfesionalPlanes';
import Home from './pages/Home';
import Register from './pages/Register';

function BuscarTurnos() {
	return <div style={{ padding: 20 }}><h2>Buscar Turnos (próximamente)</h2></div>;
}

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/buscar-turnos" element={<BuscarTurnos />} />
								  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
								  <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
								  <Route path="/admin" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
								  <Route path="/disponibilidad" element={<ProtectedRoute><Disponibilidad /></ProtectedRoute>} />
								  <Route path="/mis-planes" element={<ProtectedRoute><ProfesionalPlanes /></ProtectedRoute>} />
								  <Route path="/notas" element={<ProtectedRoute><NotasClinicas /></ProtectedRoute>} />
								  <Route path="/documentos" element={<ProtectedRoute><Documentos /></ProtectedRoute>} />
								  <Route path="/mis-turnos" element={<ProtectedRoute><MisTurnos /></ProtectedRoute>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

