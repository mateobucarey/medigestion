const express = require('express');
const router = express.Router();

// Stub documentos medicos
router.get('/', (req, res) => res.json({ success: true, data: [] }));

module.exports = router;
