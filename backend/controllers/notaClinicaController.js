const notaModel = require('../models/notaClinicaModel');

async function createNota(req, res, next) {
  try {
    // Only profesionales can create notas
    const id_profesional = parseInt(req.user.id, 10);
    const { id_turno, detalle } = req.body;
    // Additional checks: verify turno belongs to profesional could be added
    const row = await notaModel.createNota({ id_turno, detalle });
    return res.status(201).json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

async function listByTurno(req, res, next) {
  try {
    const id_turno = parseInt(req.params.turnoId, 10);
    const rows = await notaModel.findByTurno(id_turno);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function listByPaciente(req, res, next) {
  try {
    const id_paciente = parseInt(req.params.pacienteId, 10);
    const rows = await notaModel.findByPaciente(id_paciente);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { createNota, listByTurno, listByPaciente };
