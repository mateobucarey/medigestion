const pool = require('../config/db');

async function obtenerMenusPorRol(id_rol) {
  const result = await pool.query(`
    SELECT m.id_menu, m.menombre, m.medireccion
    FROM menu m
    JOIN menu_rol mr ON m.id_menu = mr.id_menu
    WHERE mr.id_rol = $1
    ORDER BY m.id_menu
  `, [id_rol]);
  return result.rows;
}

async function crearMenu({ menombre, medireccion }) {
  const result = await pool.query(
    `INSERT INTO menu (menombre, medireccion)
     VALUES ($1, $2)
     RETURNING *`,
    [menombre, medireccion]
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
  obtenerMenusPorRol,
  crearMenu,
  eliminarMenu,
};
