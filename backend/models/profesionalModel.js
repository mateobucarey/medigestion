const pool = require('../config/db');

// Obtener todos los profesionales con info de usuario
async function obtenerProfesionales() {
  const result = await pool.query(`
    SELECT p.*, u.nombre, u.apellido, u.telefono, u.mail
    FROM profesional p
    JOIN usuario u ON p.id_profesional = u.id_usuario
    ORDER BY p.id_profesional ASC
  `);
  return result.rows;
}

async function obtenerProfesionalPorId(id) {
  const result = await pool.query(`
    SELECT p.*, u.nombre, u.apellido, u.telefono, u.mail
    FROM profesional p
    JOIN usuario u ON p.id_profesional = u.id_usuario
    WHERE p.id_profesional = $1
  `, [id]);
  return result.rows[0];
}

async function crearProfesional({ id_profesional, profesion, especialidad }) {
  const result = await pool.query(
    `INSERT INTO profesional (id_profesional, profesion, especialidad)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id_profesional, profesion, especialidad]
  );
  return result.rows[0];
}

async function actualizarProfesional(id, { profesion, especialidad }) {
  const result = await pool.query(
    `UPDATE profesional
     SET profesion = $1, especialidad = $2
     WHERE id_profesional = $3
     RETURNING *`,
    [profesion, especialidad, id]
  );
  return result.rows[0];
}

async function eliminarProfesional(id) {
  const result = await pool.query(
    `DELETE FROM profesional WHERE id_profesional = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerProfesionales,
  obtenerProfesionalPorId,
  crearProfesional,
  actualizarProfesional,
  eliminarProfesional,
};
