const pool = require('../config/db');

async function obtenerDocumentosPorTurno(id_turno) {
  const result = await pool.query(
    'SELECT * FROM documento_medico WHERE id_turno = $1 ORDER BY fecha DESC',
    [id_turno]
  );
  return result.rows;
}

async function crearDocumento({ id_turno, id_profesional, tipo_documento, url, compartido_con_paciente }) {
  const result = await pool.query(
    `INSERT INTO documento_medico (id_turno, id_profesional, tipo_documento, url, compartido_con_paciente)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id_turno, id_profesional, tipo_documento, url, compartido_con_paciente]
  );
  return result.rows[0];
}

async function compartirDocumento(id) {
  const result = await pool.query(
    `UPDATE documento_medico SET compartido_con_paciente = TRUE WHERE id_documento = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerDocumentosPorTurno,
  crearDocumento,
  compartirDocumento,
};
