const disponibilidadModel = require('../models/disponibilidadModel');

async function listDisponibilidades(req, res, next) {
  try {
    const id = parseInt(req.user?.id, 10);
    const rows = await disponibilidadModel.findByProfesional(id);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function createDisponibilidad(req, res, next) {
  try {
    const id_profesional = parseInt(req.user.id, 10);
    const { dia_semana, hora_inicio, hora_fin } = req.body;
    const row = await disponibilidadModel.createDisponibilidad({ id_profesional, dia_semana, hora_inicio, hora_fin });
    return res.status(201).json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

async function updateDisponibilidad(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { dia_semana, hora_inicio, hora_fin } = req.body;
    const row = await disponibilidadModel.updateDisponibilidad(id, { dia_semana, hora_inicio, hora_fin });
    return res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

async function deleteDisponibilidad(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    await disponibilidadModel.deleteDisponibilidad(id);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listDisponibilidades, createDisponibilidad, updateDisponibilidad, deleteDisponibilidad };
