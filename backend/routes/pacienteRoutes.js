const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.getPacientes);
router.get('/:id', pacienteController.getPacientePorId);
router.post('/', pacienteController.postPaciente);
router.put('/:id', pacienteController.putPaciente);
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
