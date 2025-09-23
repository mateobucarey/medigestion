const profesionalModel = require('../models/profesionalModel');

async function getProfesionales(req, res) {
  try {
    const profesionales = await profesionalModel.obtenerProfesionales();
    res.json(profesionales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener profesionales' });
  }
}

async function getProfesionalPorId(req, res) {
  try {
    const profesional = await profesionalModel.obtenerProfesionalPorId(req.params.id);
    if (!profesional) return res.status(404).json({ mensaje: 'Profesional no encontrado' });
    res.json(profesional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener profesional' });
  }
}

async function postProfesional(req, res) {
  try {
    const nuevoProfesional = await profesionalModel.crearProfesional(req.body);
    res.status(201).json(nuevoProfesional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear profesional' });
  }
}

async function putProfesional(req, res) {
  try {
    const actualizado = await profesionalModel.actualizarProfesional(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Profesional no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar profesional' });
  }
}

async function deleteProfesional(req, res) {
  try {
    const eliminado = await profesionalModel.eliminarProfesional(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Profesional no encontrado' });
    res.json({ mensaje: 'Profesional eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar profesional' });
  }
}

module.exports = {
  getProfesionales,
  getProfesionalPorId,
  postProfesional,
  putProfesional,
  deleteProfesional,
};
