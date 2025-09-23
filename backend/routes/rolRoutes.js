const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.get('/', rolController.getRoles);
router.get('/:id', rolController.getRolPorId);
router.post('/', rolController.postRol);
router.put('/:id', rolController.putRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;