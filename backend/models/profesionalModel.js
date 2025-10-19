const pool = require('../config/db');

async function createProfesional({ id_profesional, profesion, especialidad, id_obra_social }) {
  const q = 'INSERT INTO profesional (id_profesional, profesion, especialidad, id_obra_social) VALUES ($1,$2,$3,$4)';
  await pool.query(q, [id_profesional, profesion || null, especialidad || null, id_obra_social || null]);
  return { id_profesional, profesion, especialidad, id_obra_social };
}

async function updateProfesional(id_profesional, { profesion, especialidad, id_obra_social }) {
  const q = 'UPDATE profesional SET profesion=$1, especialidad=$2, id_obra_social=$3 WHERE id_profesional=$4 RETURNING *';
  const res = await pool.query(q, [profesion, especialidad, id_obra_social || null, id_profesional]);
  return res.rows[0];
}

async function upsertProfesional({ id_profesional, profesion, especialidad, id_obra_social }) {
  const q = `INSERT INTO profesional (id_profesional, profesion, especialidad, id_obra_social)
             VALUES ($1,$2,$3,$4)
             ON CONFLICT (id_profesional) DO UPDATE SET profesion = EXCLUDED.profesion, especialidad = EXCLUDED.especialidad, id_obra_social = EXCLUDED.id_obra_social`;
  await pool.query(q, [id_profesional, profesion || null, especialidad || null, id_obra_social || null]);
  return { id_profesional, profesion, especialidad, id_obra_social };
}

async function deleteProfesional(id_profesional) {
  const q = 'DELETE FROM profesional WHERE id_profesional = $1';
  await pool.query(q, [id_profesional]);
}

module.exports = { createProfesional, updateProfesional, upsertProfesional, deleteProfesional };

