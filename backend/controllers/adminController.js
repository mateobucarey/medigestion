const usuarioModel = require('../models/usuarioModel');
const profesionalModel = require('../models/profesionalModel');
const profesionalPlanModel = require('../models/profesionalPlanModel');

async function listUsuarios(req, res, next) {
  try {
    // return users with optional profesional meta (profesion, especialidad, plan and obra)
    const q = `SELECT u.*, p.profesion, p.especialidad,
      (SELECT id_plan FROM profesional_plan WHERE id_profesional = u.id_usuario LIMIT 1) AS id_plan,
      (SELECT pl.id_obra_social FROM plan pl WHERE pl.id_plan = (SELECT id_plan FROM profesional_plan WHERE id_profesional = u.id_usuario LIMIT 1)) AS id_obra
      FROM usuario u
      LEFT JOIN profesional p ON p.id_profesional = u.id_usuario`;
    const rows = (await require('../config/db').query(q)).rows;
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

const bcrypt = require('bcrypt');

async function createUsuario(req, res, next) {
  try {
    let { nombre, apellido, telefono, mail, contrasenia, id_rol, profesion, especialidad, id_plan } = req.body;
    id_rol = Number(id_rol);
    const hashed = await bcrypt.hash(contrasenia || 'changeme', 10);
    const user = await usuarioModel.createUsuario({ nombre, apellido, telefono, mail, contrasenia: hashed, id_rol });
    // if profesional role, create profesional row (upsert)
    if (id_rol === 2) {
      const id_obra_num = req.body.id_obra ? Number(req.body.id_obra) : null;
      await profesionalModel.upsertProfesional({ id_profesional: user.id_usuario, profesion, especialidad, id_obra_social: id_obra_num });
      // if id_plan provided, set profesional_plan mapping (single plan)
      if (id_plan) await profesionalPlanModel.setProfesionalPlans(user.id_usuario, [Number(id_plan)]);
    }
    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUsuario(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
  let { nombre, apellido, telefono, mail, id_rol, profesion, especialidad, contrasenia } = req.body;
  id_rol = Number(id_rol);

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
      const id_obra_num = req.body.id_obra ? Number(req.body.id_obra) : null;
      await profesionalModel.upsertProfesional({ id_profesional: id, profesion, especialidad, id_obra_social: id_obra_num });
      // set profesional-plan mapping if id_plan provided
      if (req.body.id_plan) await profesionalPlanModel.setProfesionalPlans(id, [Number(req.body.id_plan)]);
    } else {
      // if role changed away from professional, delete profesional row if exists
      await profesionalModel.deleteProfesional(id);
      // and clear profesional_plan mappings
      await profesionalPlanModel.setProfesionalPlans(id, []);
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsuarios, createUsuario, updateUsuario };
