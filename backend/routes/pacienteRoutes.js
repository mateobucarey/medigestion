const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.optional, pacienteController.listPacientes);
router.get('/:id', authMiddleware.optional, pacienteController.getPaciente);
router.post('/', pacienteController.createPaciente); // registro de paciente (public)

module.exports = router;
