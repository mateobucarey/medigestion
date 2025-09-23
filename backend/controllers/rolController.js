const rolModel = require('../models/rolModel');

async function getRoles(req, res) {
  try {
    const roles = await rolModel.obtenerRoles();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los roles' });
  }
}

async function getRolPorId(req, res) {
  try {
    const rol = await rolModel.obtenerRolPorId(req.params.id);
    if (!rol) return res.status(404).json({ mensaje: 'Rol no encontrado' });
    res.json(rol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el rol' });
  }
}

async function postRol(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ mensaje: 'Falta el nombre del rol' });

    const nuevoRol = await rolModel.crearRol(nombre);
    res.status(201).json(nuevoRol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el rol' });
  }
}

async function putRol(req, res) {
  try {
    const { nombre } = req.body;
    const { id } = req.params;
    const actualizado = await rolModel.actualizarRol(id, nombre);

    if (!actualizado) return res.status(404).json({ mensaje: 'Rol no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el rol' });
  }
}

async function deleteRol(req, res) {
  try {
    const eliminado = await rolModel.eliminarRol(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Rol no encontrado' });
    res.json({ mensaje: 'Rol eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el rol' });
  }
}

module.exports = {
  getRoles,
  getRolPorId,
  postRol,
  putRol,
  deleteRol,
};
