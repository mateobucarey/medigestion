const express = require('express');
const router = express.Router();
const controller = require('../controllers/planController');

router.get('/', controller.getPlanes);
router.get('/:id', controller.getPlanPorId);
router.post('/', controller.postPlan);
router.put('/:id', controller.putPlan);
router.delete('/:id', controller.deletePlan);

module.exports = router;
