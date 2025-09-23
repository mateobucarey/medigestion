const obraSocialModel = require('../models/obraSocialModel');

async function getObrasSociales(req, res) {
  try {
    const obras = await obraSocialModel.obtenerObrasSociales();
    res.json(obras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener obras sociales' });
  }
}

async function getObraSocialPorId(req, res) {
  try {
    const obra = await obraSocialModel.obtenerObraSocialPorId(req.params.id);
    if (!obra) return res.status(404).json({ mensaje: 'Obra social no encontrada' });
    res.json(obra);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener la obra social' });
  }
}

async function postObraSocial(req, res) {
  try {
    const { nombre } = req.body;
    const nueva = await obraSocialModel.crearObraSocial(nombre);
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear obra social' });
  }
}

async function putObraSocial(req, res) {
  try {
    const actualizada = await obraSocialModel.actualizarObraSocial(req.params.id, req.body.nombre);
    if (!actualizada) return res.status(404).json({ mensaje: 'Obra social no encontrada' });
    res.json(actualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar obra social' });
  }
}

async function deleteObraSocial(req, res) {
  try {
    const eliminada = await obraSocialModel.eliminarObraSocial(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Obra social no encontrada' });
    res.json({ mensaje: 'Obra social eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar obra social' });
  }
}

module.exports = {
  getObrasSociales,
  getObraSocialPorId,
  postObraSocial,
  putObraSocial,
  deleteObraSocial,
};
