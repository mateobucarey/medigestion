const pool = require('../config/db');

async function findByProfesional(id_profesional) {
  const q = `SELECT t.*, u.nombre AS paciente_nombre, u.apellido AS paciente_apellido
             FROM turno t
             LEFT JOIN paciente p ON p.id_paciente = t.id_paciente
             LEFT JOIN usuario u ON u.id_usuario = t.id_paciente
             WHERE t.id_profesional = $1 AND t.estado != 'cancelado' ORDER BY fecha, hora_inicio`;
  const res = await pool.query(q, [id_profesional]);
  return res.rows;
}

async function cancelTurno(id_turno) {
  const q = 'UPDATE turno SET estado = $1 WHERE id_turno = $2 RETURNING *';
  const res = await pool.query(q, ['cancelado', id_turno]);
  return res.rows[0];
}

module.exports = { findByProfesional, cancelTurno };
