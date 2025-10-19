const pool = require('../config/db');

async function setProfesionalPlans(id_profesional, plans) {
  // plans: array of id_plan
  // delete old
  await pool.query('DELETE FROM profesional_plan WHERE id_profesional = $1', [id_profesional]);
  // insert new
  for (const id_plan of plans) {
    await pool.query('INSERT INTO profesional_plan (id_profesional, id_plan) VALUES ($1,$2)', [id_profesional, id_plan]);
  }
}

async function findPlansByProfesional(id_profesional) {
  const res = await pool.query('SELECT p.* FROM profesional_plan pp JOIN plan p ON pp.id_plan = p.id_plan WHERE pp.id_profesional = $1', [id_profesional]);
  return res.rows;
}

module.exports = { setProfesionalPlans, findPlansByProfesional };
