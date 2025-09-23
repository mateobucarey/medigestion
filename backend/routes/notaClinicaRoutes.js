const express = require('express');
const router = express.Router();
const controller = require('../controllers/notaClinicaController');

router.get('/:id_turno', controller.getNotas);
router.post('/', controller.postNota);
router.delete('/:id', controller.deleteNota);

module.exports = router;
