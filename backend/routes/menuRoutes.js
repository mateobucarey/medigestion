const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');

router.get('/', controller.getMenus);
router.post('/', controller.postMenu);
router.delete('/:id', controller.deleteMenu);

module.exports = router;
