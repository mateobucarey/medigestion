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
    const { id_rol } = req.body;

    if (![2,3].includes(id_rol)) 
      return res.status(400).json({ mensaje: 'Solo se pueden crear usuarios con rol profesional o secretario' });

    const nuevoUsuario = await usuarioModel.crearUsuario(req.body);

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: nuevoUsuario
    });

  } catch (error) {
    console.error("ERROR al crear usuario:", error);
    if (error.code === '23505') {
      res.status(400).json({ mensaje: 'El mail ya está registrado' });
    } else {
      res.status(500).json({ mensaje: error.message });
    }
  }
}

// PUT /api/usuarios/:id
async function putUsuario(req, res) {
  try {
    const { id_rol } = req.body;
    if (![2,3].includes(id_rol)) 
      return res.status(400).json({ mensaje: 'Solo se pueden editar usuarios con rol profesional o secretario' });

    const actualizado = await usuarioModel.actualizarUsuario(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
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
    res.status(500).json({ mensaje: error.message });
  }
}

module.exports = {
  getUsuarios,
  getUsuarioPorId,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
