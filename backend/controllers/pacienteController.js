const pacienteModel = require('../models/pacienteModel');

async function getPacientes(req, res) {
  try {
    const pacientes = await pacienteModel.obtenerPacientes();
    res.json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener pacientes' });
  }
}

async function getPacientePorId(req, res) {
  try {
    const paciente = await pacienteModel.obtenerPacientePorId(req.params.id);
    if (!paciente) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener paciente' });
  }
}

async function postPaciente(req, res) {
  try {
    const nuevoPaciente = await pacienteModel.crearPaciente(req.body);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      res.status(400).json({ mensaje: 'El DNI ya está registrado' });
    } else {
      res.status(500).json({ mensaje: 'Error al crear paciente' });
    }
  }
}

async function putPaciente(req, res) {
  try {
    const actualizado = await pacienteModel.actualizarPaciente(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar paciente' });
  }
}

async function deletePaciente(req, res) {
  try {
    const eliminado = await pacienteModel.eliminarPaciente(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    res.json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar paciente' });
  }
}

module.exports = {
  getPacientes,
  getPacientePorId,
  postPaciente,
  putPaciente,
  deletePaciente,
};
