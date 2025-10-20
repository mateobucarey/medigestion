const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnoController');
const auth = require('../middlewares/authMiddleware');

// Profesionales listan sus turnos
router.get('/mis-turnos', auth.onlyRole(2), controller.listForProfesional);

// Secretaría / admin listan todos los turnos
// List turnos with optional filters: from, to, id_profesional, estado
router.get('/', auth.onlyRoles(1, 3), controller.listFilteredTurnos);

// Buscar turnos disponibles (público)
router.get('/buscar', controller.buscarTurnosDisponibles);

// Profesional cancela un turno (o secretario)
router.post('/:id/cancelar', auth.onlyRoles(2, 3), controller.cancelTurno);

// Secretaría o profesional puede crear/editar turnos para un profesional
router.post('/', auth.onlyRoles(2, 3), controller.createTurno);
router.put('/:id', auth.onlyRoles(2, 3), controller.editTurno);

module.exports = router;
