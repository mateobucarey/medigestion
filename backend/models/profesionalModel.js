const pool = require('../config/db');

async function createProfesional({ id_profesional, profesion, especialidad }) {
  const q = 'INSERT INTO profesional (id_profesional, profesion, especialidad) VALUES ($1,$2,$3)';
  await pool.query(q, [id_profesional, profesion || null, especialidad || null]);
  return { id_profesional, profesion, especialidad };
}

async function updateProfesional(id_profesional, { profesion, especialidad }) {
  const q = 'UPDATE profesional SET profesion=$1, especialidad=$2 WHERE id_profesional=$3 RETURNING *';
  const res = await pool.query(q, [profesion, especialidad, id_profesional]);
  return res.rows[0];
}

async function upsertProfesional({ id_profesional, profesion, especialidad }) {
  const q = `INSERT INTO profesional (id_profesional, profesion, especialidad)
             VALUES ($1,$2,$3)
             ON CONFLICT (id_profesional) DO UPDATE SET profesion = EXCLUDED.profesion, especialidad = EXCLUDED.especialidad`;
  await pool.query(q, [id_profesional, profesion || null, especialidad || null]);
  return { id_profesional, profesion, especialidad };
}

module.exports = { createProfesional, updateProfesional, upsertProfesional };

async function deleteProfesional(id_profesional) {
  const q = 'DELETE FROM profesional WHERE id_profesional = $1';
  await pool.query(q, [id_profesional]);
}

module.exports = { createProfesional, updateProfesional, upsertProfesional, deleteProfesional };

