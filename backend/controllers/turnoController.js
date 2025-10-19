const turnoModel = require('../models/turnoModel');

async function listForProfesional(req, res, next) {
  try {
    const id_profesional = parseInt(req.user.id, 10);
    const rows = await turnoModel.findByProfesional(id_profesional);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function cancelTurno(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    // TODO: verify profesional owns the turno
    const row = await turnoModel.cancelTurno(id);
    return res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

module.exports = { listForProfesional, cancelTurno };
