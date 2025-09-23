const pool = require('../config/db');

// Obtener todos los turnos con datos de profesional y paciente
async function obtenerTurnos() {
  const result = await pool.query(`
    SELECT t.*, 
           up.nombre AS nombre_paciente, up.apellido AS apellido_paciente,
           ur.nombre AS nombre_profesional, ur.apellido AS apellido_profesional
    FROM turno t
    JOIN paciente p ON t.id_paciente = p.id_paciente
    JOIN profesional pr ON t.id_profesional = pr.id_profesional
    JOIN usuario up ON p.id_paciente = up.id_usuario
    JOIN usuario ur ON pr.id_profesional = ur.id_usuario
    ORDER BY t.fecha, t.hora_inicio
  `);
  return result.rows;
}

async function obtenerTurnoPorId(id) {
  const result = await pool.query(
    'SELECT * FROM turno WHERE id_turno = $1',
    [id]
  );
  return result.rows[0];
}

async function crearTurno({ id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado }) {
  const result = await pool.query(
    `INSERT INTO turno (id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado]
  );
  return result.rows[0];
}

async function actualizarTurno(id, { fecha, hora_inicio, hora_fin, estado }) {
  const result = await pool.query(
    `UPDATE turno SET fecha = $1, hora_inicio = $2, hora_fin = $3, estado = $4
     WHERE id_turno = $5
     RETURNING *`,
    [fecha, hora_inicio, hora_fin, estado, id]
  );
  return result.rows[0];
}

async function eliminarTurno(id) {
  const result = await pool.query(
    'DELETE FROM turno WHERE id_turno = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
};
