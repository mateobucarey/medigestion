const express = require('express');
const router = express.Router();

// Stub recordatorios
router.get('/', (req, res) => res.json({ success: true, data: [] }));

module.exports = router;
