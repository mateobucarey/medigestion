const express = require('express');
const router = express.Router();
const controller = require('../controllers/obraSocialController');

router.get('/', controller.getObrasSociales);
router.get('/:id', controller.getObraSocialPorId);
router.post('/', controller.postObraSocial);
router.put('/:id', controller.putObraSocial);
router.delete('/:id', controller.deleteObraSocial);

module.exports = router;
