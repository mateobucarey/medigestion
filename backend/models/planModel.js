const pool = require('../config/db');

async function findPlansByObra(id_obra_social) {
  const res = await pool.query('SELECT * FROM plan WHERE id_obra_social = $1', [id_obra_social]);
  return res.rows;
}

async function findAllPlans() {
  const res = await pool.query('SELECT * FROM plan');
  return res.rows;
}

async function findPlanByObraAndTipo(id_obra_social, tipo) {
  const res = await pool.query('SELECT * FROM plan WHERE id_obra_social = $1 AND LOWER(tipo) = LOWER($2) LIMIT 1', [id_obra_social, tipo]);
  return res.rows[0];
}

async function createPlan({ tipo, id_obra_social }) {
  const res = await pool.query('INSERT INTO plan (tipo, id_obra_social) VALUES ($1,$2) RETURNING *', [tipo, id_obra_social]);
  return res.rows[0];
}

module.exports = { findPlansByObra, findAllPlans, findPlanByObraAndTipo, createPlan };
