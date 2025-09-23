const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentoMedicoController');

router.get('/:id_turno', controller.getDocumentos);
router.post('/', controller.postDocumento);
router.put('/compartir/:id', controller.putCompartir);

module.exports = router;
