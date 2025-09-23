const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioPorId);
router.post('/', usuarioController.postUsuario);
router.put('/:id', usuarioController.putUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
