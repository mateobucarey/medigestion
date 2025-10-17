const pool = require('../config/db');

async function createPaciente({ id_paciente, fecha_nac, dni }) {
  const query = `INSERT INTO paciente (id_paciente, fecha_nac, dni) VALUES ($1,$2,$3)`;
  await pool.query(query, [id_paciente, fecha_nac, dni]);
  return { id_paciente, fecha_nac, dni };
}

async function findPacienteByUserId(id_paciente) {
  const res = await pool.query('SELECT p.*, u.nombre, u.apellido, u.mail FROM paciente p JOIN usuario u ON p.id_paciente = u.id_usuario WHERE p.id_paciente = $1', [id_paciente]);
  return res.rows[0];
}

async function findAllPacientes() {
  const res = await pool.query('SELECT p.*, u.nombre, u.apellido, u.mail FROM paciente p JOIN usuario u ON p.id_paciente = u.id_usuario');
  return res.rows;
}

module.exports = { createPaciente, findPacienteByUserId, findAllPacientes };
