const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraSocialController');

router.get('/', obraController.listObras);

module.exports = router;
