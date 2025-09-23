const pool = require('../config/db');

async function obtenerPlanesPorPaciente(id_paciente) {
  const result = await pool.query(`
    SELECT pp.*, p.tipo, os.nombre AS obra_social
    FROM paciente_plan pp
    JOIN plan p ON pp.id_plan = p.id_plan
    JOIN obra_social os ON p.id_obra_social = os.id_obra_social
    WHERE pp.id_paciente = $1
  `, [id_paciente]);
  return result.rows;
}

async function agregarPlanAPaciente({ id_paciente, id_plan, nro_afiliado }) {
  const result = await pool.query(`
    INSERT INTO paciente_plan (id_paciente, id_plan, nro_afiliado)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [id_paciente, id_plan, nro_afiliado]);
  return result.rows[0];
}

async function eliminarPlanDePaciente(id_paciente, id_plan) {
  const result = await pool.query(`
    DELETE FROM paciente_plan
    WHERE id_paciente = $1 AND id_plan = $2
    RETURNING *
  `, [id_paciente, id_plan]);
  return result.rows[0];
}

module.exports = {
  obtenerPlanesPorPaciente,
  agregarPlanAPaciente,
  eliminarPlanDePaciente,
};
