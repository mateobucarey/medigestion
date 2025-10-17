const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const payload = req.body;
    const result = await authService.registerPaciente(payload);
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { mail, contrasenia } = req.body;
    const result = await authService.login({ mail, contrasenia });
    if (!result) return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
