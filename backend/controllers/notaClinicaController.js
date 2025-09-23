const model = require('../models/notaClinicaModel');

async function getNotas(req, res) {
  try {
    const notas = await model.obtenerNotasPorTurno(req.params.id_turno);
    res.json(notas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener notas clínicas' });
  }
}

async function postNota(req, res) {
  try {
    const nota = await model.crearNotaClinica(req.body);
    res.status(201).json(nota);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear nota clínica' });
  }
}

async function deleteNota(req, res) {
  try {
    const eliminado = await model.eliminarNotaClinica(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Nota no encontrada' });
    res.json({ mensaje: 'Nota eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar nota' });
  }
}

module.exports = {
  getNotas,
  postNota,
  deleteNota,
};
