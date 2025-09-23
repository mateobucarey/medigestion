const model = require('../models/seguimientoModel');

async function getSeguimientos(req, res) {
  try {
    const data = await model.obtenerSeguimientosPorPaciente(req.params.id_paciente);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener seguimientos' });
  }
}

async function postSeguimiento(req, res) {
  try {
    const nuevo = await model.crearSeguimiento(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear seguimiento' });
  }
}

async function deleteSeguimiento(req, res) {
  try {
    const eliminado = await model.eliminarSeguimiento(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Seguimiento no encontrado' });
    res.json({ mensaje: 'Seguimiento eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar seguimiento' });
  }
}

module.exports = {
  getSeguimientos,
  postSeguimiento,
  deleteSeguimiento,
};
