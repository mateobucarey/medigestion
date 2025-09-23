const express = require('express');
const router = express.Router();
const controller = require('../controllers/recordatorioController');

router.get('/', controller.getRecordatorios);
router.post('/', controller.postRecordatorio);
router.delete('/:id', controller.deleteRecordatorio);

module.exports = router;
