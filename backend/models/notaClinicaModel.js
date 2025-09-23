const pool = require('../config/db');

async function obtenerNotasPorTurno(id_turno) {
  const result = await pool.query(
    'SELECT * FROM nota_clinica WHERE id_turno = $1 ORDER BY fecha_creacion DESC',
    [id_turno]
  );
  return result.rows;
}

async function crearNotaClinica({ id_turno, detalle }) {
  const result = await pool.query(
    'INSERT INTO nota_clinica (id_turno, detalle) VALUES ($1, $2) RETURNING *',
    [id_turno, detalle]
  );
  return result.rows[0];
}

async function eliminarNotaClinica(id) {
  const result = await pool.query(
    'DELETE FROM nota_clinica WHERE id_nota_clinica = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerNotasPorTurno,
  crearNotaClinica,
  eliminarNotaClinica,
};
