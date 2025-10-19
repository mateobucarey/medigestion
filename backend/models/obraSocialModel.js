const pool = require('../config/db');

async function findAllObras() {
  const res = await pool.query('SELECT * FROM obra_social');
  return res.rows;
}

async function findObraByName(nombre) {
  const res = await pool.query('SELECT * FROM obra_social WHERE LOWER(nombre) = LOWER($1) LIMIT 1', [nombre]);
  return res.rows[0];
}

async function createObra(nombre) {
  const res = await pool.query('INSERT INTO obra_social (nombre) VALUES ($1) RETURNING *', [nombre]);
  return res.rows[0];
}

module.exports = { findAllObras, findObraByName, createObra };
