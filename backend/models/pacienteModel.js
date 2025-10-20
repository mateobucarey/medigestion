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

async function searchPacientes(q) {
  if (!q) return findAllPacientes();
  const like = `%${q}%`;
  const query = `SELECT p.*, u.nombre, u.apellido, u.mail FROM paciente p JOIN usuario u ON p.id_paciente = u.id_usuario WHERE u.nombre ILIKE $1 OR u.apellido ILIKE $1 OR u.mail ILIKE $1 OR p.dni ILIKE $1`;
  const res = await pool.query(query, [like]);
  return res.rows;
}

module.exports = { createPaciente, findPacienteByUserId, findAllPacientes, searchPacientes };
