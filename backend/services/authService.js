const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

async function registerPaciente({ nombre, apellido, telefono, mail, contrasenia, fecha_nac, dni }) {
  const hashed = await bcrypt.hash(contrasenia, 10);
  // role paciente assumed to be 4 (per seed); better to query roles table in prod
  const user = await usuarioModel.createUsuario({ nombre, apellido, telefono, mail, contrasenia: hashed, id_rol: 4 });
  // create paciente record
  return { id_usuario: user.id_usuario };
}

async function login({ mail, contrasenia }) {
  const user = await usuarioModel.findByEmail(mail);
  if (!user) return null;
  const match = await bcrypt.compare(contrasenia, user.contrasenia);
  if (!match) return null;
  const token = jwt.sign({ id: user.id_usuario, rol: user.id_rol }, JWT_SECRET, { expiresIn: '8h' });
  return { token, user: { id: user.id_usuario, nombre: user.nombre, apellido: user.apellido, mail: user.mail, id_rol: user.id_rol } };
}

module.exports = { registerPaciente, login };
