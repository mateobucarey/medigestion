const pacienteService = require('../services/pacienteService');

async function createPaciente(req, res, next) {
  try {
    const payload = req.body;
    const result = await pacienteService.createPacienteFull(payload);
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function listPacientes(req, res, next) {
  try {
    const rows = await pacienteService.listPacientes();
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function getPaciente(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await pacienteService.getPaciente(id);
    if (!data) return res.status(404).json({ success: false, error: 'No encontrado' });
    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPaciente, listPacientes, getPaciente };
