const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnoPeriodicoController');

router.get('/', controller.getTurnosPeriodicos);
router.get('/:id', controller.getTurnoPeriodicoPorId);
router.post('/', controller.postTurnoPeriodico);
router.put('/:id', controller.putTurnoPeriodico);
router.delete('/:id', controller.deleteTurnoPeriodico);

module.exports = router;
