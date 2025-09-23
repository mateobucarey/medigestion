const usuarioModel = require('../models/usuarioModel');

// GET /api/usuarios
async function getUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
}

// GET /api/usuarios/:id
async function getUsuarioPorId(req, res) {
  try {
    const usuario = await usuarioModel.obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
}

// POST /api/usuarios
async function postUsuario(req, res) {
  try {
    const nuevoUsuario = await usuarioModel.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      res.status(400).json({ mensaje: 'El mail ya está registrado' });
    } else {
      res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
  }
}

// PUT /api/usuarios/:id
async function putUsuario(req, res) {
  try {
    const actualizado = await usuarioModel.actualizarUsuario(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
}

// DELETE /api/usuarios/:id
async function deleteUsuario(req, res) {
  try {
    const eliminado = await usuarioModel.eliminarUsuario(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
}

module.exports = {
  getUsuarios,
  getUsuarioPorId,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
