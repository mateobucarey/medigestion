const express = require('express');
const router = express.Router();
const controller = require('../controllers/pacientePlanController');

router.get('/:id_paciente', controller.getPlanesDePaciente);
router.post('/', controller.postPacientePlan);
router.delete('/:id_paciente/:id_plan', controller.deletePacientePlan);

module.exports = router;
