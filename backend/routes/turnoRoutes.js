const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnoController');

router.get('/', controller.getTurnos);
router.get('/:id', controller.getTurnoPorId);
router.post('/', controller.postTurno);
router.put('/:id', controller.putTurno);
router.delete('/:id', controller.deleteTurno);

module.exports = router;
