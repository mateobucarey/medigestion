const express = require('express');
const router = express.Router();
const controller = require('../controllers/seguimientoController');

router.get('/:id_paciente', controller.getSeguimientos);
router.post('/', controller.postSeguimiento);
router.delete('/:id', controller.deleteSeguimiento);

module.exports = router;
