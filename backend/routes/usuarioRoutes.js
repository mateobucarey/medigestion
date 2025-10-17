const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', authMiddleware.required, usuarioController.getPerfil);
router.put('/:id', authMiddleware.required, usuarioController.updatePerfil);

module.exports = router;
