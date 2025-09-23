const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuRolController');

router.get('/:id_rol', controller.getMenusPorRol);
router.post('/', controller.postMenuRol);
router.delete('/:id_menu/:id_rol', controller.deleteMenuRol);

module.exports = router;
