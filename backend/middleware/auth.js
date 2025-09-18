const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos id_usuario e id_rol en req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};