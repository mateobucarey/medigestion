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

async function findById(id_turno) {
  const q = 'SELECT * FROM turno WHERE id_turno = $1';
  const res = await pool.query(q, [id_turno]);
  return res.rows[0];
}

async function createTurno({ id_profesional, id_paciente, fecha, hora_inicio, hora_fin }) {
  const q = `INSERT INTO turno (id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [id_profesional, id_paciente, fecha, hora_inicio, hora_fin, 'confirmado'];
  const res = await pool.query(q, values);
  return res.rows[0];
}

async function updateTurno(id_turno, { id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado }) {
  const q = `UPDATE turno SET id_profesional = COALESCE($1, id_profesional), id_paciente = COALESCE($2, id_paciente), fecha = COALESCE($3, fecha), hora_inicio = COALESCE($4, hora_inicio), hora_fin = COALESCE($5, hora_fin), estado = COALESCE($6, estado) WHERE id_turno = $7 RETURNING *`;
  const values = [id_profesional || null, id_paciente || null, fecha || null, hora_inicio || null, hora_fin || null, estado || null, id_turno];
  const res = await pool.query(q, values);
  return res.rows[0];
}

async function findAllTurnos() {
  const q = `SELECT t.*, up.nombre AS profesional_nombre, up.apellido AS profesional_apellido, u.nombre AS paciente_nombre, u.apellido AS paciente_apellido
             FROM turno t
             LEFT JOIN usuario u ON u.id_usuario = t.id_paciente
             LEFT JOIN usuario up ON up.id_usuario = t.id_profesional
             ORDER BY fecha, hora_inicio`;
  const res = await pool.query(q);
  return res.rows;
}

async function findByProfesionalAndFecha(id_profesional, fecha) {
  const q = `SELECT * FROM turno WHERE id_profesional = $1 AND fecha = $2 AND estado != 'cancelado'`;
  const res = await pool.query(q, [id_profesional, fecha]);
  return res.rows;
}

// Flexible finder with filters: from, to (dates), id_profesional, estado
async function findTurnos({ from, to, id_profesional, estado }) {
  const conditions = [];
  const values = [];
  let idx = 1;

  let q = `SELECT t.*, up.nombre AS profesional_nombre, up.apellido AS profesional_apellido, u.nombre AS paciente_nombre, u.apellido AS paciente_apellido
             FROM turno t
             LEFT JOIN usuario u ON u.id_usuario = t.id_paciente
             LEFT JOIN usuario up ON up.id_usuario = t.id_profesional`;

  if (from) {
    conditions.push(`t.fecha >= $${idx++}`);
    values.push(from);
  }
  if (to) {
    conditions.push(`t.fecha <= $${idx++}`);
    values.push(to);
  }
  if (id_profesional) {
    conditions.push(`t.id_profesional = $${idx++}`);
    values.push(id_profesional);
  }
  if (estado) {
    conditions.push(`t.estado = $${idx++}`);
    values.push(estado);
  }

  if (conditions.length) q += ' WHERE ' + conditions.join(' AND ');
  q += ' ORDER BY fecha, hora_inicio';

  const res = await pool.query(q, values);
  return res.rows;
}

module.exports = { findByProfesional, cancelTurno, findById, createTurno, updateTurno, findAllTurnos, findTurnos, findByProfesionalAndFecha };
