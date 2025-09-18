// Importamos el Pool desde el paquete 'pg'.
// Pool nos permite manejar un conjunto de conexiones a la base de datos PostgreSQL.
const { Pool } = require('pg');

// Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// Creamos una nueva instancia del Pool con la configuración necesaria.
// Los valores vienen desde las variables de entorno para mantener la seguridad y flexibilidad.
const pool = new Pool({
  host: process.env.DB_HOST,         // Dirección del host de PostgreSQL (ej: 'localhost')
  user: process.env.DB_USER,         // Usuario de la base de datos (ej: 'postgres')
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME,     // Nombre de la base de datos a la que nos conectamos
  port: process.env.DB_PORT,         // Puerto de conexión (por defecto es 5432)
});

// Exportamos el pool para poder usarlo en otros archivos del proyecto.
// Así evitamos reescribir la configuración cada vez que queremos hacer una query.
module.exports = pool;