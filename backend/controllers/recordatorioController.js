const model = require('../models/recordatorioModel');

async function getRecordatorios(req, res) {
  try {
    const recordatorios = await model.obtenerRecordatorios();
    res.json(recordatorios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener recordatorios' });
  }
}

async function postRecordatorio(req, res) {
  try {
    const nuevo = await model.crearRecordatorio(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear recordatorio' });
  }
}

async function deleteRecordatorio(req, res) {
  try {
    const eliminado = await model.eliminarRecordatorio(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    res.json({ mensaje: 'Recordatorio eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar recordatorio' });
  }
}

module.exports = {
  getRecordatorios,
  postRecordatorio,
  deleteRecordatorio,
};
