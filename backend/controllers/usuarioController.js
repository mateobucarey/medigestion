const usuarioModel = require('../models/usuarioModel');

async function getPerfil(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await usuarioModel.findById(id);
    if (!user) return res.status(404).json({ success: false, error: 'No encontrado' });
    return res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updatePerfil(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { nombre, apellido, telefono } = req.body;
    const user = await usuarioModel.updateUsuario(id, { nombre, apellido, telefono });
    return res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { getPerfil, updatePerfil };
