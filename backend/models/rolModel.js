const pool = require('../config/db');

async function obtenerRoles() {
  const result = await pool.query('SELECT * FROM rol ORDER BY id_rol ASC');
  return result.rows;
}

async function obtenerRolPorId(id) {
  const result = await pool.query('SELECT * FROM rol WHERE id_rol = $1', [id]);
  return result.rows[0];
}

async function crearRol(nombre) {
  const result = await pool.query(
    'INSERT INTO rol (nombre) VALUES ($1) RETURNING *',
    [nombre]
  );
  return result.rows[0];
}

async function actualizarRol(id, nombre) {
  const result = await pool.query(
    'UPDATE rol SET nombre = $1 WHERE id_rol = $2 RETURNING *',
    [nombre, id]
  );
  return result.rows[0];
}

async function eliminarRol(id) {
  const result = await pool.query(
    'DELETE FROM rol WHERE id_rol = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol,
};
