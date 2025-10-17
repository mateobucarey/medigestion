const pool = require('../config/db');

async function findPlansByObra(id_obra_social) {
  const res = await pool.query('SELECT * FROM plan WHERE id_obra_social = $1', [id_obra_social]);
  return res.rows;
}

async function findAllPlans() {
  const res = await pool.query('SELECT * FROM plan');
  return res.rows;
}

module.exports = { findPlansByObra, findAllPlans };
