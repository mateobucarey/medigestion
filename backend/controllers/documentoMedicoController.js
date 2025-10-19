const pool = require('../config/db');
const path = require('path');

async function uploadDocument(req, res, next) {
  try {
    // multer should populate req.file and fields
    const { id_turno, id_profesional, id_paciente, tipo_documento, compartir } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, error: 'No file uploaded' });
    const url = path.join('uploads', file.filename);
    const q = `INSERT INTO documento_medico (id_turno, id_profesional, id_paciente, tipo_documento, url, compartido_con_paciente) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
    const values = [id_turno || null, id_profesional || null, id_paciente || null, tipo_documento || null, url, compartir === 'true' || compartir === true];
    const resdb = await pool.query(q, values);
    return res.status(201).json({ success: true, data: resdb.rows[0] });
  } catch (err) {
    next(err);
  }
}

async function listDocumentsByTurno(req, res, next) {
  try {
    const id_turno = parseInt(req.params.turnoId, 10);
    const db = await pool.query('SELECT * FROM documento_medico WHERE id_turno = $1 ORDER BY fecha DESC', [id_turno]);
    return res.json({ success: true, data: db.rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadDocument, listDocumentsByTurno };
