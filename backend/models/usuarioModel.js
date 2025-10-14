const pool = require('../config/db');
const bcrypt = require('bcrypt');

async function obtenerUsuarios() {
  const result = await pool.query(`
    SELECT u.*, r.nombre AS rol_nombre
    FROM usuario u
    LEFT JOIN rol r ON u.id_rol = r.id_rol
    WHERE u.id_rol IN (2, 3)
    ORDER BY u.id_usuario ASC
  `);
  return result.rows;
}

async function obtenerUsuarioPorId(id) {
  const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
  return result.rows[0];
}

async function crearUsuario({ nombre, apellido, telefono, mail, contrasenia, id_rol, profesion, especialidad }) {
  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(contrasenia, 10);

  // Insert usuario
  const result = await pool.query(
    `INSERT INTO usuario (nombre, apellido, telefono, mail, contrasenia, id_rol)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [nombre, apellido, telefono, mail, hashedPassword, id_rol]
  );

  const id_usuario = result.rows[0].id_usuario;

  // Si es profesional, insertar en tabla profesional
  if (id_rol === 2) {
    await pool.query(
      `INSERT INTO profesional (id_profesional, profesion, especialidad)
       VALUES ($1,$2,$3)
       ON CONFLICT (id_profesional) DO UPDATE 
       SET profesion = EXCLUDED.profesion,
           especialidad = EXCLUDED.especialidad`,
      [id_usuario, profesion || null, especialidad || null]
    );
  }

  return result.rows[0];
}

async function actualizarUsuario(id, { nombre, apellido, telefono, mail, contrasenia, id_rol, profesion, especialidad }) {
  const hashedPassword = contrasenia ? await bcrypt.hash(contrasenia, 10) : undefined;

  const result = await pool.query(
    `UPDATE usuario SET 
        nombre = $1,
        apellido = $2,
        telefono = $3,
        mail = $4,
        contrasenia = COALESCE($5, contrasenia),
        id_rol = $6
     WHERE id_usuario = $7
     RETURNING *`,
    [nombre, apellido, telefono, mail, hashedPassword, id_rol, id]
  );

  if (id_rol === 2) {
    await pool.query(
      `INSERT INTO profesional (id_profesional, profesion, especialidad)
       VALUES ($1,$2,$3)
       ON CONFLICT (id_profesional) DO UPDATE 
       SET profesion = EXCLUDED.profesion,
           especialidad = EXCLUDED.especialidad`,
      [id, profesion || null, especialidad || null]
    );
  }

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
