const pool = require('../config/db');

async function obtenerObrasSociales() {
  const result = await pool.query('SELECT * FROM obra_social ORDER BY id_obra_social ASC');
  return result.rows;
}

async function obtenerObraSocialPorId(id) {
  const result = await pool.query('SELECT * FROM obra_social WHERE id_obra_social = $1', [id]);
  return result.rows[0];
}

async function crearObraSocial(nombre) {
  const result = await pool.query(
    'INSERT INTO obra_social (nombre) VALUES ($1) RETURNING *',
    [nombre]
  );
  return result.rows[0];
}

async function actualizarObraSocial(id, nombre) {
  const result = await pool.query(
    'UPDATE obra_social SET nombre = $1 WHERE id_obra_social = $2 RETURNING *',
    [nombre, id]
  );
  return result.rows[0];
}

async function eliminarObraSocial(id) {
  const result = await pool.query(
    'DELETE FROM obra_social WHERE id_obra_social = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerObrasSociales,
  obtenerObraSocialPorId,
  crearObraSocial,
  actualizarObraSocial,
  eliminarObraSocial,
};
