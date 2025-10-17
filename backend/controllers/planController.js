const planModel = require('../models/planModel');

async function listPlans(req, res, next) {
  try {
    const { obraId } = req.query;
    if (obraId) {
      const rows = await planModel.findPlansByObra(obraId);
      return res.json({ success: true, data: rows });
    }
    const rows = await planModel.findAllPlans();
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPlans };
