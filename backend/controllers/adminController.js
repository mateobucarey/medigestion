const usuarioModel = require('../models/usuarioModel');
const profesionalModel = require('../models/profesionalModel');

async function listUsuarios(req, res, next) {
  try {
    // simple list all users (in prod add pagination/filters)
    const q = 'SELECT * FROM usuario';
    const rows = (await require('../config/db').query(q)).rows;
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

const bcrypt = require('bcrypt');

async function createUsuario(req, res, next) {
  try {
    const { nombre, apellido, telefono, mail, contrasenia, id_rol, profesion, especialidad } = req.body;
    const hashed = await bcrypt.hash(contrasenia || 'changeme', 10);
    const user = await usuarioModel.createUsuario({ nombre, apellido, telefono, mail, contrasenia: hashed, id_rol });
    // if profesional role, create profesional row (upsert)
    if (id_rol === 2) {
      await profesionalModel.upsertProfesional({ id_profesional: user.id_usuario, profesion, especialidad });
    }
    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUsuario(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
  const { nombre, apellido, telefono, mail, id_rol, profesion, especialidad, contrasenia } = req.body;

    const fields = { };
    if (nombre !== undefined) fields.nombre = nombre;
    if (apellido !== undefined) fields.apellido = apellido;
  if (telefono !== undefined) fields.telefono = telefono;
  if (mail !== undefined) fields.mail = mail;
    if (id_rol !== undefined) fields.id_rol = id_rol;
    if (contrasenia) {
      const hashed = await bcrypt.hash(contrasenia, 10);
      fields.contrasenia = hashed;
    }

    const user = await usuarioModel.updateUsuario(id, fields);

    // handle profesional rows
    if (id_rol === 2) {
      await profesionalModel.upsertProfesional({ id_profesional: id, profesion, especialidad });
    } else {
      // if role changed away from professional, delete profesional row if exists
      await profesionalModel.deleteProfesional(id);
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsuarios, createUsuario, updateUsuario };
