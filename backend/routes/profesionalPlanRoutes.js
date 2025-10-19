const express = require('express');
const router = express.Router();
const controller = require('../controllers/profesionalPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.onlyRole(2), controller.getProfesionalPlans);
router.post('/', authMiddleware.onlyRole(2), controller.setProfesionalPlans);

module.exports = router;
