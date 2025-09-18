//RUTAS DE AUTENTICACION
// Importamos Express para poder crear rutas
const express = require('express');

// Creamos un router, que es como un mini servidor enfocado en un tema específico
const router = express.Router();

// Importamos el controlador que maneja la lógica de login y registro
const authController = require('../controllers/authController');

const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, authController.me);


// Ruta POST para registrar un nuevo usuario
// Cuando el frontend haga POST a /api/auth/register, se ejecuta authController.register
router.post('/register', authController.register);

// Ruta POST para iniciar sesión
// Cuando el frontend haga POST a /api/auth/login, se ejecuta authController.login
router.post('/login', authController.login);

// Exportamos el router para poder usarlo en index.js
module.exports = router;