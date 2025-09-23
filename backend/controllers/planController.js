const planModel = require('../models/planModel');

async function getPlanes(req, res) {
  try {
    const planes = await planModel.obtenerPlanes();
    res.json(planes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener planes' });
  }
}

async function getPlanPorId(req, res) {
  try {
    const plan = await planModel.obtenerPlanPorId(req.params.id);
    if (!plan) return res.status(404).json({ mensaje: 'Plan no encontrado' });
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener plan' });
  }
}

async function postPlan(req, res) {
  try {
    const nuevo = await planModel.crearPlan(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear plan' });
  }
}

async function putPlan(req, res) {
  try {
    const actualizado = await planModel.actualizarPlan(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Plan no encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar plan' });
  }
}

async function deletePlan(req, res) {
  try {
    const eliminado = await planModel.eliminarPlan(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Plan no encontrado' });
    res.json({ mensaje: 'Plan eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar plan' });
  }
}

module.exports = {
  getPlanes,
  getPlanPorId,
  postPlan,
  putPlan,
  deletePlan,
};
