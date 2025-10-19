const pool = require('../config/db');

async function createNota({ id_turno, detalle }) {
  const q = 'INSERT INTO nota_clinica (id_turno, detalle) VALUES ($1,$2) RETURNING *';
  const res = await pool.query(q, [id_turno || null, detalle]);
  return res.rows[0];
}

async function findByTurno(id_turno) {
  const res = await pool.query('SELECT * FROM nota_clinica WHERE id_turno = $1 ORDER BY fecha_creacion DESC', [id_turno]);
  return res.rows;
}

async function findByPaciente(id_paciente) {
  const q = `SELECT n.* FROM nota_clinica n JOIN turno t ON n.id_turno = t.id_turno WHERE t.id_paciente = $1 ORDER BY n.fecha_creacion DESC`;
  const res = await pool.query(q, [id_paciente]);
  return res.rows;
}

module.exports = { createNota, findByTurno, findByPaciente };
