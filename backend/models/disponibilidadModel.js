const pool = require('../config/db');

async function createDisponibilidad({ id_profesional, dia_semana, hora_inicio, hora_fin }) {
  const q = 'INSERT INTO disponibilidad (id_profesional, dia_semana, hora_inicio, hora_fin) VALUES ($1,$2,$3,$4) RETURNING *';
  const res = await pool.query(q, [id_profesional, dia_semana, hora_inicio, hora_fin]);
  return res.rows[0];
}

async function updateDisponibilidad(id_disponibilidad, { dia_semana, hora_inicio, hora_fin }) {
  const q = 'UPDATE disponibilidad SET dia_semana=$1, hora_inicio=$2, hora_fin=$3 WHERE id_disponibilidad=$4 RETURNING *';
  const res = await pool.query(q, [dia_semana, hora_inicio, hora_fin, id_disponibilidad]);
  return res.rows[0];
}

async function deleteDisponibilidad(id_disponibilidad) {
  await pool.query('DELETE FROM disponibilidad WHERE id_disponibilidad = $1', [id_disponibilidad]);
}

async function findByProfesional(id_profesional) {
  const res = await pool.query('SELECT * FROM disponibilidad WHERE id_profesional = $1 ORDER BY dia_semana, hora_inicio', [id_profesional]);
  return res.rows;
}

module.exports = { createDisponibilidad, updateDisponibilidad, deleteDisponibilidad, findByProfesional };
