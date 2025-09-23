const disponibilidadModel = require('../models/disponibilidadModel');

async function getTodas(req, res) {
  try {
    const data = await disponibilidadModel.obtenerDisponibilidades();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener disponibilidades' });
  }
}

async function getPorProfesional(req, res) {
  try {
    const data = await disponibilidadModel.obtenerDisponibilidadPorProfesional(req.params.id_profesional);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener la disponibilidad' });
  }
}

async function postDisponibilidad(req, res) {
  try {
    const nuevo = await disponibilidadModel.crearDisponibilidad(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear disponibilidad' });
  }
}

async function putDisponibilidad(req, res) {
  try {
    const actualizado = await disponibilidadModel.actualizarDisponibilidad(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar disponibilidad' });
  }
}

async function deleteDisponibilidad(req, res) {
  try {
    const eliminado = await disponibilidadModel.eliminarDisponibilidad(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Disponibilidad eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar disponibilidad' });
  }
}

module.exports = {
  getTodas,
  getPorProfesional,
  postDisponibilidad,
  putDisponibilidad,
  deleteDisponibilidad,
};
