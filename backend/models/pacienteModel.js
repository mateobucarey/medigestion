const pool = require('../config/db');

// Obtener todos los pacientes con su info de usuario
async function obtenerPacientes() {
  const result = await pool.query(`
    SELECT p.*, u.nombre, u.apellido, u.telefono, u.mail
    FROM paciente p
    JOIN usuario u ON p.id_paciente = u.id_usuario
    ORDER BY p.id_paciente ASC
  `);
  return result.rows;
}

// Obtener paciente por ID
async function obtenerPacientePorId(id) {
  const result = await pool.query(`
    SELECT p.*, u.nombre, u.apellido, u.telefono, u.mail
    FROM paciente p
    JOIN usuario u ON p.id_paciente = u.id_usuario
    WHERE p.id_paciente = $1
  `, [id]);
  return result.rows[0];
}

// Crear nuevo paciente (asociado a un usuario ya existente)
async function crearPaciente({ id_paciente, fecha_nac, dni }) {
  const result = await pool.query(
    `INSERT INTO paciente (id_paciente, fecha_nac, dni)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id_paciente, fecha_nac, dni]
  );
  return result.rows[0];
}

// Actualizar datos del paciente
async function actualizarPaciente(id, { fecha_nac, dni }) {
  const result = await pool.query(
    `UPDATE paciente
     SET fecha_nac = $1, dni = $2
     WHERE id_paciente = $3
     RETURNING *`,
    [fecha_nac, dni, id]
  );
  return result.rows[0];
}

// Eliminar paciente
async function eliminarPaciente(id) {
  const result = await pool.query(
    'DELETE FROM paciente WHERE id_paciente = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
