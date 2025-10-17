const pool = require('../config/db');

async function findAllObras() {
  const res = await pool.query('SELECT * FROM obra_social');
  return res.rows;
}

module.exports = { findAllObras };
