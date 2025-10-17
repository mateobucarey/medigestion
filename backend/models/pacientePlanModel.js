const pool = require('../config/db');

async function createPacientePlan({ id_paciente, id_plan, nro_afiliado }) {
  const q = 'INSERT INTO paciente_plan (id_paciente, id_plan, nro_afiliado) VALUES ($1,$2,$3)';
  await pool.query(q, [id_paciente, id_plan, nro_afiliado || null]);
  return { id_paciente, id_plan, nro_afiliado };
}

module.exports = { createPacientePlan };
