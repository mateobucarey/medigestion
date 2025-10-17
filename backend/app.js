// ---------------------------
// IMPORTS
// ---------------------------
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ---------------------------
// MIDDLEWARES
// ---------------------------
// Permitir peticiones de cualquier origen (CORS)
app.use(cors());

// Parsear cuerpos JSON en las requests
app.use(express.json());

// ---------------------------
// RUTA RAÍZ
// ---------------------------
app.get('/', (req, res) => {
  res.send('Backend corriendo ✅');
});

// ---------------------------
// RUTAS DE AUTENTICACIÓN
// ---------------------------
app.use('/api/auth', require('./routes/authRoutes'));

// ---------------------------
// RUTAS DE USUARIOS Y ROLES
// ---------------------------
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/roles', require('./routes/rolRoutes'));

// ---------------------------
// RUTAS DE PACIENTES Y PROFESIONALES
// ---------------------------
app.use('/api/pacientes', require('./routes/pacienteRoutes'));
app.use('/api/profesionales', require('./routes/profesionalRoutes'));

// ---------------------------
// RUTAS DE OBRA SOCIAL Y PLANES
// ---------------------------
app.use('/api/obras-sociales', require('./routes/obraSocialRoutes'));
app.use('/api/planes', require('./routes/planRoutes'));
app.use('/api/paciente-plan', require('./routes/pacientePlanRoutes'));
// Admin routes
app.use('/api/admin', require('./routes/adminRoutes'));

// ---------------------------
// RUTAS DE DISPONIBILIDAD Y TURNOS
// ---------------------------
app.use('/api/disponibilidad', require('./routes/disponibilidadRoutes'));
app.use('/api/turnos', require('./routes/turnoRoutes'));
app.use('/api/turnos-periodicos', require('./routes/turnoPeriodicoRoutes'));

// ---------------------------
// RUTAS DE NOTAS Y DOCUMENTOS MÉDICOS
// ---------------------------
app.use('/api/notas-clinicas', require('./routes/notaClinicaRoutes'));
app.use('/api/documentos', require('./routes/documentoMedicoRoutes'));

// ---------------------------
// RUTAS DE RECORDATORIOS Y SEGUIMIENTOS
// ---------------------------
app.use('/api/recordatorios', require('./routes/recordatorioRoutes'));
app.use('/api/seguimientos', require('./routes/seguimientoRoutes'));

// ---------------------------
// RUTAS DE MENÚ Y MENÚ-ROL
// ---------------------------
//app.use('/api/menus', require('./routes/menuRoutes'));
app.use('/api/menu-rol', require('./routes/menuRolRoutes'));


app.use("/api/menu", require("./routes/menuRoutes"));

// ---------------------------
// EXPORTAMOS APP PARA INDEX.JS O TESTS
// ---------------------------
module.exports = app;
