const express = require('express');
const router = express.Router();
const dispController = require('../controllers/disponibilidadController');
const authMiddleware = require('../middlewares/authMiddleware');

// Profesionales gestionan su propia disponibilidad
router.get('/', authMiddleware.onlyRole(2), dispController.listDisponibilidades);
router.post('/', authMiddleware.onlyRole(2), dispController.createDisponibilidad);
router.put('/:id', authMiddleware.onlyRole(2), dispController.updateDisponibilidad);
router.delete('/:id', authMiddleware.onlyRole(2), dispController.deleteDisponibilidad);

module.exports = router;
