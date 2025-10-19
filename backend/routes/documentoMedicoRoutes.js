const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentoMedicoController');
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// simple disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, '..', 'uploads')); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_')); }
});
const upload = multer({ storage });

// upload document - only professionals can upload
router.post('/', auth.onlyRole(2), upload.single('file'), controller.uploadDocument);

// list documents by turno (authorized)
router.get('/turno/:turnoId', auth.required, controller.listDocumentsByTurno);

module.exports = router;

