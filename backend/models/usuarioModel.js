const pool = require('../config/db');

async function obtenerUsuarios() {
  const result = await pool.query(`
    SELECT u.*, r.nombre AS rol_nombre
    FROM usuario u
    LEFT JOIN rol r ON u.id_rol = r.id_rol
    ORDER BY u.id_usuario ASC
  `);
  return result.rows;
}

async function obtenerUsuarioPorId(id) {
  const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
  return result.rows[0];
}

async function crearUsuario({ nombre, apellido, telefono, mail, contrasenia, id_rol }) {
  const result = await pool.query(
    `INSERT INTO usuario (nombre, apellido, telefono, mail, contrasenia, id_rol)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [nombre, apellido, telefono, mail, contrasenia, id_rol]
  );
  return result.rows[0];
}

async function actualizarUsuario(id, { nombre, apellido, telefono, mail, contrasenia, id_rol }) {
  const result = await pool.query(
    `UPDATE usuario SET 
        nombre = $1,
        apellido = $2,
        telefono = $3,
        mail = $4,
        contrasenia = $5,
        id_rol = $6
     WHERE id_usuario = $7
     RETURNING *`,
    [nombre, apellido, telefono, mail, contrasenia, id_rol, id]
  );
  return result.rows[0];
}

async function eliminarUsuario(id) {
  const result = await pool.query(
    'DELETE FROM usuario WHERE id_usuario = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
