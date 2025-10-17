const express = require('express');
const router = express.Router();

// Stub seguimientos
router.get('/', (req, res) => res.json({ success: true, data: [] }));

module.exports = router;
