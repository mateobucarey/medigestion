const express = require('express');
const router = express.Router();
const controller = require('../controllers/notaClinicaController');
const auth = require('../middlewares/authMiddleware');

// Profesionales crean notas privadas por turno
router.post('/', auth.onlyRole(2), controller.createNota);

// Obtener notas por turno (profesional o paciente)
router.get('/turno/:turnoId', auth.required, controller.listByTurno);

// Consultar historial clinico del paciente (solo profesional)
router.get('/paciente/:pacienteId', auth.onlyRole(2), controller.listByPaciente);

module.exports = router;

