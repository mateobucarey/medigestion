const pacientePlanModel = require('../models/pacientePlanModel');

async function getPlanesDePaciente(req, res) {
  try {
    const planes = await pacientePlanModel.obtenerPlanesPorPaciente(req.params.id_paciente);
    res.json(planes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener planes del paciente' });
  }
}

async function postPacientePlan(req, res) {
  try {
    const nuevo = await pacientePlanModel.agregarPlanAPaciente(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar plan al paciente' });
  }
}

async function deletePacientePlan(req, res) {
  try {
    const eliminado = await pacientePlanModel.eliminarPlanDePaciente(
      req.params.id_paciente,
      req.params.id_plan
    );
    if (!eliminado) return res.status(404).json({ mensaje: 'Relación no encontrada' });
    res.json({ mensaje: 'Plan eliminado del paciente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar relación' });
  }
}

module.exports = {
  getPlanesDePaciente,
  postPacientePlan,
  deletePacientePlan,
};
