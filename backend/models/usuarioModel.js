const pool = require('../config/db');

async function createUsuario({ nombre, apellido, telefono, mail, contrasenia, id_rol }) {
  const query = `INSERT INTO usuario (nombre, apellido, telefono, mail, contrasenia, id_rol)
                 VALUES ($1,$2,$3,$4,$5,$6) RETURNING id_usuario`;
  const values = [nombre, apellido, telefono || null, mail, contrasenia, id_rol || null];
  const res = await pool.query(query, values);
  return res.rows[0];
}

async function findByEmail(mail) {
  const res = await pool.query('SELECT * FROM usuario WHERE mail = $1', [mail]);
  return res.rows[0];
}

async function findById(id_usuario) {
  const res = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id_usuario]);
  return res.rows[0];
}

async function updateUsuario(id_usuario, fields) {
  // Build dynamic SET clause
  const keys = Object.keys(fields);
  if (keys.length === 0) return findById(id_usuario);
  const set = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const values = keys.map(k => fields[k]);
  values.push(id_usuario);
  const q = `UPDATE usuario SET ${set} WHERE id_usuario=$${values.length} RETURNING *`;
  const res = await pool.query(q, values);
  return res.rows[0];
}

module.exports = { createUsuario, findByEmail, findById, updateUsuario };
