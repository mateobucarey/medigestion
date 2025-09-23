const turnoModel = require('../models/turnoModel');

async function getTurnos(req, res) {
  try {
    const turnos = await turnoModel.obtenerTurnos();
    res.json(turnos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener turnos' });
  }
}

async function getTurnoPorId(req, res) {
  try {
    const turno = await turnoModel.obtenerTurnoPorId(req.params.id);
    if (!turno) return res.status(404).json({ mensaje: 'Turno no encontrado' });
    res.json(turno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener turno' });
  }
}

async function postTurno(req, res) {
  try {
    const nuevo = await turnoModel.crearTurno(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear turno' });
  }
}

async function putTurno(req, res) {
  try {
    const actualizado = await turnoModel.actualizarTurno(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Turno no encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar turno' });
  }
}

async function deleteTurno(req, res) {
  try {
    const eliminado = await turnoModel.eliminarTurno(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Turno no encontrado' });
    res.json({ mensaje: 'Turno eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar turno' });
  }
}

module.exports = {
  getTurnos,
  getTurnoPorId,
  postTurno,
  putTurno,
  deleteTurno,
};
