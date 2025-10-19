const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnoController');
const auth = require('../middlewares/authMiddleware');

// Profesionales listan sus turnos
router.get('/mis-turnos', auth.onlyRole(2), controller.listForProfesional);

// Profesional cancela un turno
router.post('/:id/cancelar', auth.onlyRole(2), controller.cancelTurno);

module.exports = router;
