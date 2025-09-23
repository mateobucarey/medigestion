const model = require('../models/turnoPeriodicoModel');

async function getTurnosPeriodicos(req, res) {
  try {
    const turnos = await model.obtenerTurnosPeriodicos();
    res.json(turnos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener turnos periódicos' });
  }
}

async function getTurnoPeriodicoPorId(req, res) {
  try {
    const turno = await model.obtenerTurnoPeriodicoPorId(req.params.id);
    if (!turno) return res.status(404).json({ mensaje: 'Turno periódico no encontrado' });
    res.json(turno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener turno periódico' });
  }
}

async function postTurnoPeriodico(req, res) {
  try {
    const nuevo = await model.crearTurnoPeriodico(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear turno periódico' });
  }
}

async function putTurnoPeriodico(req, res) {
  try {
    const actualizado = await model.actualizarTurnoPeriodico(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Turno periódico no encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar turno periódico' });
  }
}

async function deleteTurnoPeriodico(req, res) {
  try {
    const eliminado = await model.eliminarTurnoPeriodico(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Turno periódico eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar turno periódico' });
  }
}

module.exports = {
  getTurnosPeriodicos,
  getTurnoPeriodicoPorId,
  postTurnoPeriodico,
  putTurnoPeriodico,
  deleteTurnoPeriodico,
};
