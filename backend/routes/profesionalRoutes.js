const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/', profesionalController.getProfesionales);
router.get('/:id', profesionalController.getProfesionalPorId);
router.post('/', profesionalController.postProfesional);
router.put('/:id', profesionalController.putProfesional);
router.delete('/:id', profesionalController.deleteProfesional);

module.exports = router;
