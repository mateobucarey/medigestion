const pool = require('../config/db');

async function obtenerTurnosPeriodicos() {
  const result = await pool.query(`
    SELECT * FROM turno_periodico
    ORDER BY id_profesional, dia_semana
  `);
  return result.rows;
}

async function obtenerTurnoPeriodicoPorId(id) {
  const result = await pool.query(
    'SELECT * FROM turno_periodico WHERE id_turno_periodico = $1',
    [id]
  );
  return result.rows[0];
}

async function crearTurnoPeriodico(data) {
  const {
    id_paciente,
    id_profesional,
    frecuencia,
    dia_semana,
    hora_inicio,
    hora_fin,
    fecha_inicio,
    fecha_fin
  } = data;

  const result = await pool.query(`
    INSERT INTO turno_periodico (
      id_paciente, id_profesional, frecuencia,
      dia_semana, hora_inicio, hora_fin,
      fecha_inicio, fecha_fin
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `, [
    id_paciente, id_profesional, frecuencia,
    dia_semana, hora_inicio, hora_fin,
    fecha_inicio, fecha_fin
  ]);

  return result.rows[0];
}

async function actualizarTurnoPeriodico(id, data) {
  const {
    frecuencia, dia_semana, hora_inicio,
    hora_fin, fecha_inicio, fecha_fin
  } = data;

  const result = await pool.query(`
    UPDATE turno_periodico
    SET frecuencia = $1, dia_semana = $2, hora_inicio = $3,
        hora_fin = $4, fecha_inicio = $5, fecha_fin = $6
    WHERE id_turno_periodico = $7
    RETURNING *
  `, [
    frecuencia, dia_semana, hora_inicio,
    hora_fin, fecha_inicio, fecha_fin,
    id
  ]);

  return result.rows[0];
}

async function eliminarTurnoPeriodico(id) {
  const result = await pool.query(
    'DELETE FROM turno_periodico WHERE id_turno_periodico = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerTurnosPeriodicos,
  obtenerTurnoPeriodicoPorId,
  crearTurnoPeriodico,
  actualizarTurnoPeriodico,
  eliminarTurnoPeriodico,
};
