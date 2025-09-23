// Importamos Express y CORS
/*
const express = require('express');
const cors = require('cors');

// Cargamos variables de entorno del archivo .env
require('dotenv').config();

// Creamos la app de Express
const app = express();

// Definimos el puerto (prioriza el .env, si no usa 3001 por defecto)
const port = process.env.PORT || 3001;

// ---------------------------
// Middlewares
// ---------------------------

// Permitir peticiones desde otros orígenes (como tu frontend en React)
app.use(cors());

// Parsear automáticamente el cuerpo de las requests en formato JSON
app.use(express.json());

// ---------------------------
// Rutas
// ---------------------------

// Importamos y usamos las rutas de autenticación
// Todas empiezan con /api/auth (ej: /api/auth/login)
app.get('/', (req, res) => {
  res.send('Backend corriendo ✅');
});

app.use('/api/auth', require('./routes/authRoutes'));

// ---------------------------
// Server Start
// ---------------------------

// Iniciamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
*/

const app = require('./app');

// Puerto desde .env o 3001 por defecto
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
