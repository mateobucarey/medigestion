const pool = require('../config/db');

async function obtenerSeguimientosPorPaciente(id_paciente) {
  const result = await pool.query(
    'SELECT * FROM seguimiento WHERE id_paciente = $1 ORDER BY fecha_envio DESC',
    [id_paciente]
  );
  return result.rows;
}

async function crearSeguimiento({ id_turno, id_paciente, fecha_envio, nota, enlace, frecuencia }) {
  const result = await pool.query(`
    INSERT INTO seguimiento (id_turno, id_paciente, fecha_envio, nota, enlace, frecuencia)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [id_turno, id_paciente, fecha_envio, nota, enlace, frecuencia]);
  return result.rows[0];
}

async function eliminarSeguimiento(id) {
  const result = await pool.query(
    'DELETE FROM seguimiento WHERE id_seguimiento = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerSeguimientosPorPaciente,
  crearSeguimiento,
  eliminarSeguimiento,
};
