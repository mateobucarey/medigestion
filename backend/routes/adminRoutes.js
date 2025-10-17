const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect admin routes to role id 1 (admin)
router.get('/usuarios', authMiddleware.onlyRole(1), adminController.listUsuarios);
router.post('/usuarios', authMiddleware.onlyRole(1), adminController.createUsuario);
router.put('/usuarios/:id', authMiddleware.onlyRole(1), adminController.updateUsuario);

module.exports = router;
