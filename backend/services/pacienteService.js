const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');
const pacienteModel = require('../models/pacienteModel');
const pacientePlanModel = require('../models/pacientePlanModel');

async function createPacienteFull({ nombre, apellido, telefono, mail, contrasenia, fecha_nac, dni, id_plan, nro_afiliado }) {
  // validar si ya existe mail
  const existing = await usuarioModel.findByEmail(mail);
  if (existing) throw new Error('El mail ya está registrado');

  const hashed = await bcrypt.hash(contrasenia, 10);
  // role paciente assumed to be 4
  const user = await usuarioModel.createUsuario({ nombre, apellido, telefono, mail, contrasenia: hashed, id_rol: 4 });
  const id_paciente = user.id_usuario;
  // create paciente row
  await pacienteModel.createPaciente({ id_paciente, fecha_nac, dni });

  // if plan provided, create paciente_plan
  if (id_plan) {
    await pacientePlanModel.createPacientePlan({ id_paciente, id_plan, nro_afiliado });
  }

  return { id_paciente };
}

async function listPacientes() {
  return pacienteModel.findAllPacientes();
}

async function getPaciente(id_paciente) {
  return pacienteModel.findPacienteByUserId(id_paciente);
}

module.exports = { createPacienteFull, listPacientes, getPaciente };
