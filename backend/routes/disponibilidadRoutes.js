const express = require('express');
const router = express.Router();
const controller = require('../controllers/disponibilidadController');

router.get('/', controller.getTodas);
router.get('/id/:id', controller.getPorId);
router.get('/:id_profesional', controller.getPorProfesional);
router.post('/', controller.postDisponibilidad);
router.post('/multiple', controller.postMultiples); // ← nueva ruta
router.put('/:id', controller.putDisponibilidad);
router.delete('/:id', controller.deleteDisponibilidad);

module.exports = router;
