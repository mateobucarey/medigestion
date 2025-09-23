const pool = require('../config/db');

async function obtenerRecordatorios() {
  const result = await pool.query('SELECT * FROM recordatorio ORDER BY fecha_envio DESC');
  return result.rows;
}

async function crearRecordatorio({ id_turno, fecha_envio, mensaje }) {
  const result = await pool.query(
    `INSERT INTO recordatorio (id_turno, fecha_envio, mensaje)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id_turno, fecha_envio, mensaje]
  );
  return result.rows[0];
}

async function eliminarRecordatorio(id) {
  const result = await pool.query(
    'DELETE FROM recordatorio WHERE id_recordatorio = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerRecordatorios,
  crearRecordatorio,
  eliminarRecordatorio,
};
