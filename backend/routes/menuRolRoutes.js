const express = require('express');
const router = express.Router();

// Stub menu-rol
router.get('/', (req, res) => res.json({ success: true, data: [] }));

module.exports = router;
