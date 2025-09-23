const pool = require('../config/db');

async function obtenerPlanes() {
  const result = await pool.query(`
    SELECT p.*, o.nombre AS obra_social
    FROM plan p
    JOIN obra_social o ON p.id_obra_social = o.id_obra_social
    ORDER BY p.id_plan ASC
  `);
  return result.rows;
}

async function obtenerPlanPorId(id) {
  const result = await pool.query('SELECT * FROM plan WHERE id_plan = $1', [id]);
  return result.rows[0];
}

async function crearPlan({ tipo, id_obra_social }) {
  const result = await pool.query(
    'INSERT INTO plan (tipo, id_obra_social) VALUES ($1, $2) RETURNING *',
    [tipo, id_obra_social]
  );
  return result.rows[0];
}

async function actualizarPlan(id, { tipo, id_obra_social }) {
  const result = await pool.query(
    `UPDATE plan SET tipo = $1, id_obra_social = $2 WHERE id_plan = $3 RETURNING *`,
    [tipo, id_obra_social, id]
  );
  return result.rows[0];
}

async function eliminarPlan(id) {
  const result = await pool.query(
    'DELETE FROM plan WHERE id_plan = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerPlanes,
  obtenerPlanPorId,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
};
