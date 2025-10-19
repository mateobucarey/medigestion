const profesionalPlanModel = require('../models/profesionalPlanModel');

async function getProfesionalPlans(req, res, next) {
  try {
    const id = parseInt(req.user.id, 10);
    const rows = await profesionalPlanModel.findPlansByProfesional(id);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function setProfesionalPlans(req, res, next) {
  try {
    const id = parseInt(req.user.id, 10);
    // accept either numeric plans and id_obra OR textual obra_nombre and plan_tipo
    const { plans, id_obra, obra_nombre, plan_tipo } = req.body;
    let finalPlans = Array.isArray(plans) ? plans.map(Number) : [];
    let obraId = id_obra ? Number(id_obra) : null;

    const obraModel = require('../models/obraSocialModel');
    const planModel = require('../models/planModel');
    // if obra_nombre provided, find or create the obra
    if (obra_nombre) {
      let obra = await obraModel.findObraByName(obra_nombre);
      if (!obra) obra = await obraModel.createObra(obra_nombre);
      obraId = obra.id_obra_social;
    }
    // if plan_tipo provided (single), find or create plan under the obraId
    if (plan_tipo && obraId) {
      let plan = await planModel.findPlanByObraAndTipo(obraId, plan_tipo);
      if (!plan) plan = await planModel.createPlan({ tipo: plan_tipo, id_obra_social: obraId });
      finalPlans = [plan.id_plan];
    }

    // persist obra id to profesional row if available
    if (obraId) {
      const profesionalModel = require('../models/profesionalModel');
      try {
        await profesionalModel.upsertProfesional({ id_profesional: id, profesion: undefined, especialidad: undefined, id_obra_social: obraId });
      } catch (err) {
        // If DB doesn't have id_obra_social column, fallback to upsert without it
        console.warn('upsertProfesional with id_obra_social failed, retrying without it:', err.message);
        try {
          await profesionalModel.upsertProfesional({ id_profesional: id, profesion: undefined, especialidad: undefined });
        } catch (err2) {
          // rethrow original error for visibility
          throw err2;
        }
      }
    }

    await profesionalPlanModel.setProfesionalPlans(id, finalPlans || []);
    return res.json({ success: true });
  } catch (err) {
    console.error('Error in setProfesionalPlans:', err);
    return res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
}

module.exports = { getProfesionalPlans, setProfesionalPlans };
