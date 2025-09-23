const express = require('express');
const router = express.Router();
const controller = require('../controllers/disponibilidadController');

router.get('/', controller.getTodas);
router.get('/:id_profesional', controller.getPorProfesional);
router.post('/', controller.postDisponibilidad);
router.put('/:id', controller.putDisponibilidad);
router.delete('/:id', controller.deleteDisponibilidad);

module.exports = router;
