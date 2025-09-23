const pool = require('../config/db');

async function obtenerMenusPorRol(id_rol) {
  const result = await pool.query(`
    SELECT m.*
    FROM menu_rol mr
    JOIN menu m ON mr.id_menu = m.id_menu
    WHERE mr.id_rol = $1
  `, [id_rol]);
  return result.rows;
}

async function asignarMenuARol({ id_menu, id_rol }) {
  const result = await pool.query(`
    INSERT INTO menu_rol (id_menu, id_rol)
    VALUES ($1, $2)
    RETURNING *
  `, [id_menu, id_rol]);
  return result.rows[0];
}

async function eliminarMenuDeRol(id_menu, id_rol) {
  const result = await pool.query(`
    DELETE FROM menu_rol
    WHERE id_menu = $1 AND id_rol = $2
    RETURNING *
  `, [id_menu, id_rol]);
  return result.rows[0];
}

module.exports = {
  obtenerMenusPorRol,
  asignarMenuARol,
  eliminarMenuDeRol,
};
