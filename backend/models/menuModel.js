const pool = require('../config/db');

async function obtenerMenus() {
  const result = await pool.query('SELECT * FROM menu ORDER BY id_menu');
  return result.rows;
}

async function crearMenu({ nombre, dir_padre, dir_hijo }) {
  const result = await pool.query(
    `INSERT INTO menu (nombre, dir_padre, dir_hijo)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, dir_padre, dir_hijo]
  );
  return result.rows[0];
}

async function eliminarMenu(id) {
  const result = await pool.query(
    'DELETE FROM menu WHERE id_menu = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerMenus,
  crearMenu,
  eliminarMenu,
};
