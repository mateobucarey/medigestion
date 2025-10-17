const express = require('express');
const router = express.Router();

// Stub menu
router.get('/', (req, res) => res.json({ success: true, data: [] }));

module.exports = router;
