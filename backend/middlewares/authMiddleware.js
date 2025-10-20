const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

function optional(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    // ignore invalid
  }
  return next();
}

function required(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, error: 'No autorizado' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token inválido' });
  }
}

function onlyRole(roleId) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, error: 'No autorizado' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if (payload.rol !== roleId) return res.status(403).json({ success: false, error: 'Sin permisos' });
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Token inválido' });
    }
  };
}

function onlyRoles(...roleIds) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, error: 'No autorizado' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if (!roleIds.includes(payload.rol)) return res.status(403).json({ success: false, error: 'Sin permisos' });
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Token inválido' });
    }
  };
}

module.exports = { optional, required, onlyRole, onlyRoles };

