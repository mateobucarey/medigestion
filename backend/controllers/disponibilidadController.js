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

async function getPorId(req, res) {
  try {
    const data = await disponibilidadModel.obtenerDisponibilidadPorId(req.params.id);
    if (!data) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener disponibilidad' });
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

// 🔹 NUEVA FUNCIÓN
async function postMultiples(req, res) {
  try {
    const { disponibilidades } = req.body;
    if (!Array.isArray(disponibilidades) || disponibilidades.length === 0) {
      return res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const nuevos = await disponibilidadModel.crearMultiplesDisponibilidades(disponibilidades);
    res.status(201).json(nuevos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear disponibilidades múltiples' });
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
  getPorId,
  postDisponibilidad,
  postMultiples, // ← agregado
  putDisponibilidad,
  deleteDisponibilidad,
};
