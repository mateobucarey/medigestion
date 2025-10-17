const obraModel = require('../models/obraSocialModel');

async function listObras(req, res, next) {
  try {
    const rows = await obraModel.findAllObras();
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { listObras };
