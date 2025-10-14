const pool = require('../config/db');

async function obtenerDisponibilidades() {
  const result = await pool.query(`
    SELECT d.*, u.nombre, u.apellido
    FROM disponibilidad d
    JOIN profesional p ON d.id_profesional = p.id_profesional
    JOIN usuario u ON p.id_profesional = u.id_usuario
    ORDER BY d.id_profesional, d.dia_semana
  `);
  return result.rows;
}

async function obtenerDisponibilidadPorProfesional(id_profesional) {
  const result = await pool.query(`
    SELECT * FROM disponibilidad
    WHERE id_profesional = $1
    ORDER BY dia_semana
  `, [id_profesional]);
  return result.rows;
}

async function obtenerDisponibilidadPorId(id) {
  const result = await pool.query(
    'SELECT * FROM disponibilidad WHERE id_disponibilidad = $1',
    [id]
  );
  return result.rows[0];
}

async function crearDisponibilidad({ id_profesional, dia_semana, hora_inicio, hora_fin }) {
  const result = await pool.query(`
    INSERT INTO disponibilidad (id_profesional, dia_semana, hora_inicio, hora_fin)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [id_profesional, dia_semana, hora_inicio, hora_fin]);
  return result.rows[0];
}

// 🔹 NUEVA FUNCIÓN: crea varias disponibilidades en una sola operación
async function crearMultiplesDisponibilidades(disponibilidades) {
  const results = [];
  for (const d of disponibilidades) {
    const result = await pool.query(`
      INSERT INTO disponibilidad (id_profesional, dia_semana, hora_inicio, hora_fin)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [d.id_profesional, d.dia_semana, d.hora_inicio, d.hora_fin]);
    results.push(result.rows[0]);
  }
  return results;
}

async function actualizarDisponibilidad(id, data) {
  const { dia_semana, hora_inicio, hora_fin } = data;
  const result = await pool.query(`
    UPDATE disponibilidad
    SET dia_semana = $1, hora_inicio = $2, hora_fin = $3
    WHERE id_disponibilidad = $4
    RETURNING *
  `, [dia_semana, hora_inicio, hora_fin, id]);
  return result.rows[0];
}

async function eliminarDisponibilidad(id) {
  const result = await pool.query(
    'DELETE FROM disponibilidad WHERE id_disponibilidad = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerDisponibilidades,
  obtenerDisponibilidadPorProfesional,
  obtenerDisponibilidadPorId,
  crearDisponibilidad,
  crearMultiplesDisponibilidades, // ← agregado
  actualizarDisponibilidad,
  eliminarDisponibilidad,
};
