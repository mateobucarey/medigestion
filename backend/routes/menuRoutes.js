const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, controller.getMenus);
router.post('/', authMiddleware, controller.postMenu);
router.delete('/:id', authMiddleware, controller.deleteMenu);

module.exports = router;
